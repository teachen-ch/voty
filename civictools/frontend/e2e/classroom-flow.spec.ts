import { expect, test } from "@playwright/test";
import { teacherEmail, teacherPassword } from "./credentials.mjs";

test("teacher creates a discussion and a student contributes", async ({
  browser,
}) => {
  const teacherContext = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  await teacherContext.addInitScript(() => {
    localStorage.setItem("civictools:intro:dashboard", "shown");
    localStorage.setItem("civictools:intro:room", "shown");
  });
  const teacherPage = await teacherContext.newPage();

  try {
    await teacherPage.goto("/login");
    await teacherPage.getByPlaceholder("Email").fill(teacherEmail);
    await teacherPage.getByPlaceholder("Password").fill(teacherPassword);
    await teacherPage.getByRole("button", { name: "Login" }).click();
    await expect(teacherPage).toHaveURL(/\/dashboard$/);

    await teacherPage.getByText("Empty room", { exact: true }).click();
    const roomName = `E2E discussion ${Date.now()}`;
    await teacherPage.getByPlaceholder("New room name…").fill(roomName);
    await teacherPage.getByRole("button", { name: "Create Room" }).click();
    await expect(teacherPage).toHaveURL(/\/room\/[a-z0-9]+$/);

    await teacherPage.getByRole("button", { name: "Discussion board" }).click();
    const discussionPrompt = teacherPage.getByPlaceholder(
      "What should the class discuss?"
    );
    await discussionPrompt.fill("Should our town build a new park?");
    await expect(discussionPrompt).toHaveValue(
      "Should our town build a new park?"
    );
    await teacherPage.getByRole("button", { name: "Add", exact: true }).click();
    await expect(
      teacherPage.getByText("Should our town build a new park?")
    ).toBeVisible();
    await expect(teacherPage.getByText("Pro", { exact: true })).toBeVisible();
    await expect(
      teacherPage.getByText("Contra", { exact: true })
    ).toBeVisible();

    await teacherPage.getByRole("button", { name: "Copy join link" }).click();
    const studentUrl = await teacherPage.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(studentUrl).toMatch(/\/join\/[a-z0-9]+$/);

    const studentContext = await browser.newContext();
    const studentPage = await studentContext.newPage();
    try {
      await studentPage.goto(studentUrl);
      await expect(studentPage.getByText(`Join: ${roomName}`)).toBeVisible();
      await studentPage.getByPlaceholder("Your nickname").fill("Alex Student");
      await studentPage.getByRole("button", { name: "Join Room" }).click();
      await expect(studentPage).toHaveURL(/\/s\/[a-z0-9]+$/);
      await expect(
        studentPage.getByText("Should our town build a new park?")
      ).toBeVisible();

      await studentPage
        .getByRole("button", { name: "Add pro argument" })
        .click();
      const argument = studentPage.getByPlaceholder("Your argument…");
      await argument.fill(
        "A park gives families a place to spend time outdoors."
      );
      await argument.blur();
      await expect(
        studentPage.getByText(
          "A park gives families a place to spend time outdoors."
        )
      ).toBeVisible();
    } finally {
      await studentContext.close();
    }
  } finally {
    await teacherContext.close();
  }
});
