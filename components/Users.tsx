import { gql } from "@apollo/client";
import {
  TeamTeacherFieldsFragment,
  useUpdateUserMutation,
  useDeleteUserMutation,
  User,
  Gender,
  Role,
  UserUpdateInput,
} from "graphql/types";
import { ReactElement, useState } from "react";
import { Link as A, Box, Button, Text } from "components/ui";
import { Label, Input as UIInput, Select } from "components/ui";
import { SessionUser, useSetUser } from "state/user";
import { z, ErrorBox } from "./Form";
import CheckLogin from "./CheckLogin";
import Image from "next/image";
import IconOK from "../public/images/icon_user_ok.svg";
import IconNOK from "../public/images/icon_user_nok.svg";
import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "components/ui";
import { useTr } from "util/translate";
import Link from "next/link";

export const GET_USERS = gql`
  query users($where: UserWhereInput) {
    users(where: $where) {
      id
      shortname
      team {
        id
        name
        school {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    ...LoginFields
  }
  ${CheckLogin.fragments.LoginFields}
}
`;

export const DELETE_USER = gql`
  mutation deleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
      shortname
    }
  }
`;
type myUser = Pick<
  User,
  "email" | "emailVerified" | "id" | "name" | "shortname"
>;

export function Users({
  users,
}: {
  users?: TeamTeacherFieldsFragment["members"];
}): ReactElement {
  const [deleteUser] = useDeleteUserMutation({
    update: (cache, result) => {
      cache.evict({ id: `User:${result.data?.deleteUser?.id}` });
      cache.gc();
    },
  });

  async function doDeleteUser(id: string) {
    if (
      confirm(
        "Diese Email-Adresse wurde noch nicht bestätigt. Soll das Konto gelöscht werden?"
      )
    ) {
      await deleteUser({ variables: { where: { id } } });
    }
  }

  return (
    <table
      style={{
        borderTop: "2px solid",
      }}
    >
      <tbody>
        {!users || users.length === 0 ? (
          <tr>
            <td colSpan={3}>Es wurden noch keine Schüler*innen hinzugefügt</td>
          </tr>
        ) : (
          users?.map((user: myUser) => (
            <tr key={user.id}>
              <td style={{ maxWidth: "200px" }}>
                <A href={`mailto:${user.email}`}>{user.shortname}</A>
              </td>
              <td>
                <A
                  className="hidden sm:inline"
                  href={`mailto:${user.email}`}
                >
                  {user.email}
                </A>
              </td>
              <td>
                <div className="flex justify-center">
                  {user.emailVerified ? (
                    <Image src={IconOK} alt="Bestätigt" />
                  ) : (
                    <Image
                      src={IconNOK}
                      alt="Nicht bestätigt"
                      onClick={() => doDeleteUser(user.id)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

interface IProfileForm {
  name?: string | null;
  lastname?: string | null;
  gender?: Gender | null;
  year?: number | null;
}

export const ProfileEdit: React.FC<React.PropsWithChildren<{
  user: SessionUser;
  editMode?: boolean;
  skipName?: boolean;
  onFinish?: () => void;
}>> = ({ user, editMode, onFinish, skipName }) => {
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(editMode);
  const setUser = useSetUser();
  const tr = useTr();
  const [doUpdateUser] = useUpdateUserMutation({
    onCompleted(data) {
      setUser(data.updateUser);
      setEdit(false);
      onFinish && onFinish();
    },
    onError(error) {
      setError(error.message);
    },
  });

  const isTeacher =
    user?.role === Role.Teacher || user?.role === Role.Principal;
  const isStudent = !isTeacher;

  const startYear = new Date().getFullYear() - (isStudent ? 20 : 100);
  const numYears = isStudent ? 12 : 90;

  async function onSubmit(values: IProfileForm) {
    // Only include fields the active form actually registered: RHF drops
    // unregistered fields from `values`, so sending `{ set: undefined }`
    // serializes to `{}` and trips Prisma's StringFieldUpdateOperationsInput.
    const data: UserUpdateInput = {};
    if (values.name !== undefined) data.name = { set: values.name };
    if (values.lastname !== undefined)
      data.lastname = { set: values.lastname };
    if (values.year !== undefined && values.year !== null && String(values.year) !== "")
      data.year = { set: parseInt(String(values.year)) };
    if (values.gender)
      data.gender = { set: values.gender };
    await doUpdateUser({
      variables: { where: { id: user?.id }, data },
    });
  }

  const initialValues: IProfileForm = {
    name: user?.name,
    lastname: user?.lastname,
    year: user?.year,
    gender: user?.gender,
  };

  const nameField = skipName
    ? z.string().optional()
    : z.string().min(1, tr("Pflichtfeld"));
  const teacherSchema = z.object({
    name: nameField,
    lastname: z.string().nullable().optional(),
  });
  const studentSchema = z.object({
    name: nameField,
    year: z
      .union([z.string().min(1), z.number()])
      .refine((v) => v !== "" && v !== null && v !== undefined, {
        message: tr("Profile.RequiredError"),
      }),
    gender: z
      .string()
      .min(1, tr("Profile.RequiredError"))
      .refine((v) => v !== null && v !== "", {
        message: tr("Profile.RequiredError"),
      }),
  });
  const validationSchema = (isTeacher
    ? teacherSchema
    : studentSchema) as unknown as z.ZodType<IProfileForm>;

  if (!edit) {
    return (
      <Grid gap={2} columns="1fr 3fr">
        {!skipName && (
          <ShowField label={tr("Profile.Firstname")} value={user?.name} />
        )}
        {!skipName && isTeacher && (
          <ShowField label={tr("Profile.Lastname")} value={user?.lastname} />
        )}
        {isStudent && (
          <ShowField label={tr("Profile.Year")} value={user?.year} />
        )}
        {isStudent && (
          <ShowField
            label={tr("Profile.Gender")}
            value={getGenderText(user?.gender)}
          />
        )}
        <ShowField label={tr("Profile.Email")} value={user?.email} />
        <Button onClick={() => setEdit(true)} className="sm:col-start-2">
          {tr("Profile.Edit")}
        </Button>
        <Text className="text-sm text-left sm:col-start-2">
          {tr(`Profile.Legal.${user?.role}`)}

          <Link href="/datenschutz/" passHref>
            <A target="_blank" className="underline">
              {tr("Profile.DataLink")}
            </A>
          </Link>
        </Text>
      </Grid>
    );
  } else {
    return (
      <ProfileForm
        defaults={initialValues}
        schema={validationSchema}
        onSubmit={onSubmit}
        isStudent={isStudent}
        isTeacher={isTeacher}
        skipName={skipName}
        startYear={startYear}
        numYears={numYears}
        error={error}
        user={user}
      />
    );
  }
};

const ProfileForm: React.FC<{
  defaults: IProfileForm;
  schema: z.ZodType<IProfileForm>;
  onSubmit: (values: IProfileForm) => Promise<void> | void;
  isStudent: boolean;
  isTeacher: boolean;
  skipName?: boolean;
  startYear: number;
  numYears: number;
  error: string;
  user: SessionUser;
}> = ({
  defaults,
  schema,
  onSubmit,
  isStudent,
  isTeacher,
  skipName,
  startYear,
  numYears,
  error,
  user,
}) => {
  const tr = useTr();
  const methods = useForm<IProfileForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: defaults,
  });
  const submit: SubmitHandler<IProfileForm> = (values) => onSubmit(values);
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <Grid gap={2} columns="1fr 3fr">
          {!skipName && (
            <Input label="Vorname" name="name" placeholder="Vorname" />
          )}
          {!skipName && isTeacher && (
            <Input label="Nachname" name="lastname" placeholder="Nachname" />
          )}
          {isStudent && (
            <>
              <Label htmlFor="year" className="pt-[6px]">
                {" "}
                {tr("Profile.Year")}:
              </Label>
              <Select id="year" {...register("year")} defaultValue={user?.year ?? ""}>
                <option value="">{tr("Profile.Choose")}</option>
                {[...Array(numYears).keys()].map((i) => (
                  <option key={i}>{startYear + (numYears - i)}</option>
                ))}
                <option value={0}>{tr("Profile.Skip")}</option>
              </Select>
              <FieldError message={errors.year?.message as string | undefined} />
              <label htmlFor="gender">{tr("Profile.Gender")}:</label>
              <Box id="gender" className="text-left">
                <Grid columns="1fr 2fr" gap={0}>
                  <label>
                    <input type="radio" {...register("gender")} value={Gender.Female} />{" "}
                    {tr("Profile.Female")}
                  </label>
                  <label>
                    <input type="radio" {...register("gender")} value={Gender.Male} />{" "}
                    {tr("Profile.Male")}
                  </label>
                  <label>
                    <input type="radio" {...register("gender")} value={Gender.Other} />{" "}
                    {tr("Profile.Other")}
                  </label>
                  <label>
                    <input type="radio" {...register("gender")} value={Gender.Unkown} />{" "}
                    {tr("Profile.Skip")}
                  </label>
                </Grid>
              </Box>
              <FieldError message={errors.gender?.message as string | undefined} />
            </>
          )}
          {isTeacher && (
            <ShowField label="Email" value="Kontaktiere uns für Änderungen" />
          )}
          <Button type="submit" className="sm:col-start-2 my-2">
            {tr("Profile.Save")}
          </Button>
          <ErrorBox error={error} className="mb-8" />

          <Text className="text-sm text-left sm:col-start-2">
            {tr(`Profile.Legal.${user?.role}`)}
            <Link href="/datenschutz/" passHref>
              <A target="_blank" className="underline">
                {tr("Profile.DataLink")}
              </A>
            </Link>
          </Text>
        </Grid>
      </form>
    </FormProvider>
  );
};

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  focus?: boolean;
};

export const Input: React.FC<React.PropsWithChildren<InputProps>> = ({
  label,
  name,
  placeholder,
  focus,
}) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name]?.message as string | undefined;
  return (
    <>
      <Label className="self-center" htmlFor={name}>
        {label}:
      </Label>
      <UIInput
        id={name}
        placeholder={placeholder}
        autoFocus={focus}
        {...register(name)}
      />
      {error ? (
        <>
          <Text variant="fielderror" className="sm:col-start-2">
            {error}
          </Text>
        </>
      ) : null}
    </>
  );
};

export const FieldError: React.FC<{ message?: string }> = ({ message }) =>
  message ? (
    <Text variant="fielderror" className="sm:col-start-2">
      {message}
    </Text>
  ) : null;

export const ShowField: React.FC<React.PropsWithChildren<{
  label: string;
  value?: string | null | number;
}>> = ({ label, value }) => {
  return (
    <>
      <Text className="my-0 sm:my-1 text-left pt-0 sm:pt-2">
        {label}:
      </Text>
      <Text className="my-1 py-[7px] mb-8 sm:mb-0 text-xl text-left">
        {value || "–"}
      </Text>
    </>
  );
};

export function getGenderText(gender?: Gender | null): string {
  if (gender === Gender.Female) return "weiblich";
  if (gender === Gender.Male) return "männlich";
  if (gender === Gender.Other) return "anderes";
  return "nicht angegeben";
}
