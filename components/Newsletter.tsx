export default function Newsletter() {
  return (
    <div className="newsletter">
      <form action="https://newsletter.teachen.ch/subscribe" method="POST">
        <Field id="Vorname" label="Vorname" />
        <Field id="name" label="Nachname" />

        <Select id="Funktion" label="Ich bin">
          <option>---</option>
          <option>Lehrer/-in</option>
          <option>Schüler/-in</option>
          <option>Schulleiter/-in</option>
        </Select>

        <Field id="email" label="Email" />

        <div className="is-hidden">
          <label htmlFor="hp">HP</label>
          <br />
          <input type="text" name="hp" id="hp" />
        </div>
        <input type="hidden" name="list" value="tpTmOmECEZr7Zjk76307UvTA" />
        <input type="hidden" name="subform" value="yes" />
        <Submit name="submit" value="Newsletter anmelden" />
      </form>
    </div>
  );
}

export function Field({ id, label }: { id: string; label: string }) {
  return (
    <div className="row is-vertical-align">
      <div className="col-3">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="col">
        <input type="text" name={id} id={id} />
      </div>
    </div>
  );
}

export function Submit({ name, value }: { name: string; value: string }) {
  return (
    <div className="row is-vertical-align">
      <div className="col-3"></div>
      <div className="col">
        <input type="submit" name={name} value={value} />
      </div>
    </div>
  );
}

export function Select({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="row is-vertical-align">
      <div className="col-3">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="col">
        <select name={id} id={id}>
          {children}
        </select>
      </div>
    </div>
  );
}
