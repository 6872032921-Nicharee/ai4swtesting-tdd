# ai4swtesting-tdd

🌐 **English** | [ภาษาไทย](README.th.md)

A hands-on exercise in using generative AI to aid **test-driven development (TDD)**, for the **AI for Software Testing** lecture
(2110724 Software Testing and Quality Assurance).

The exercise follows the worked TDD example in Chapter 4 of the book *Software Testing with Generative AI* (Mark Winteringham, Manning), rewritten in **JavaScript and Jest** instead of Java and JUnit.
You will build a small timesheet manager one red/green/refactor loop at a time. A **coding agent in VS Code** helps you write the tests and the code, and also plays the role of a tester you pair with.

## Before you start

### 1. Fork and clone this repo

You **must fork this repository** to your own GitHub account and do all your work in your fork. In this exercise you write and run code, so you need to work **on your computer**, not in the browser.

1. Sign in to [GitHub](https://github.com). If you don't have an account, create one for free.
2. Click the **Fork** button at the top right of this page, then click **Create fork**.
3. Clone **your fork** (`https://github.com/<your-username>/ai4swtesting-tdd`), not this original repo:
   ```bash
   git clone https://github.com/<your-username>/ai4swtesting-tdd.git
   cd ai4swtesting-tdd
   ```

### 2. Install the tools

You need:

- **Node.js 18 or later** – <https://nodejs.org> (the LTS version is fine). Check with `node --version`.
- **Git** – <https://git-scm.com>. Check with `git --version`.
- **Visual Studio Code** – <https://code.visualstudio.com>.
- **A coding agent in VS Code.** Any agent that can read and edit the files in your project works, for example:
  - **GitHub Copilot** in agent mode: install the GitHub Copilot extension, open the **Chat** view, and choose **Agent** mode. The free plan (**Copilot Free**) is enough for this exercise, and verified students on [GitHub Education](https://education.github.com) can use Copilot Pro for free.
  - **OpenAI Codex**, **Claude Code** or **Gemini Code Assist**: install the extension from the VS Code **Extensions** view (`Ctrl+Shift+X`, or `Cmd+Shift+X` on macOS) and sign in. Some of these need a paid plan, so check before you start.
- About 1 hour.

### 3. Install the project and run the tests

In the project folder, run:

```bash
npm install
npm test
```

The test run **fails** with `Your test suite must contain at least one test.` This is expected: [`tests/timesheet.test.js`](tests/timesheet.test.js) contains no tests yet. You will add them in Activity 2.

The project has two files you will work on:

| File | What it is |
|------|------------|
| [`src/timesheet.js`](src/timesheet.js) | Production code: an empty `Timesheet` class |
| [`tests/timesheet.test.js`](tests/timesheet.test.js) | Unit tests (Jest): empty, apart from the line that loads `Timesheet` |

### How to submit

You submit **your code and its commit history**. You don't need to write or submit any answer files.

1. **Commit after every red, green and refactor step**, using the commit messages given in each activity (for example, `loop 1: red`). Your commit history is how your instructor sees that you worked test-first.
2. Push your commits to your fork:
   ```bash
   git push
   ```
3. **Submit the URL of your fork** (`https://github.com/<your-username>/ai4swtesting-tdd`) **on MyCourseVille.** Make sure all your work is committed and pushed.

## The feature: a timesheet manager

### What is a timesheet?

A **timesheet** is a record of how much time you spent on each piece of work. Software houses and consultancies often ask staff to fill one in every day or week, for example "Project A: 3 hours, Project B: 4.5 hours today". The data is then used to bill clients for the hours actually worked, to see whether a project is over its planned time, or to spot people who have too much work.

### What we will build in this exercise

We will build only the **core logic** of the system, as a single JavaScript class called `Timesheet` in [`src/timesheet.js`](src/timesheet.js):

- There is **no** user interface, web server or database. All data is kept in the object's memory and is lost when the program ends.
- We use the class only through **unit tests**, so the tests are both the checks and the first "user" of the code.
- The `Timesheet` class starts empty. Every method comes from a test we write first.

By the end of the activities, the `Timesheet` class can do three things:

| Activity | What it adds |
|----------|--------------|
| 2 | **Submit a timesheet**: record how many hours were spent on which project |
| 3 | **Retrieve timesheets**: list all the recorded time |
| 4 | **Total a project's hours**: calculate the total hours spent on one project |

Activity 5 adds no new behaviour; it improves the code that is already there.

> 💡 The user story below is written from the user's point of view, so some things are still unclear, and we won't build every part of it in this exercise. That is normal in real projects. In Activity 1, we ask an LLM to help find these ambiguities.

### User story

All the activities build parts of this user story:

> As a timesheet user, I want to be able to track time against specific projects, so that I can keep a history of how much time I have spent working on individual projects.
>
> **Features:**
> - Time is tracked in half hour units.
> - To complete a timesheet, a project and amount of time must be entered.
> - Only I should be able to see my tracked time.

## Activities

| # | Activity |
|---|----------|
| 1 | [Think before you code: let the LLM ask questions](#activity-1--think-before-you-code-let-the-llm-ask-questions) |
| 2 | [Loop 1: Submit a timesheet](#activity-2--loop-1-submit-a-timesheet) |
| 3 | [Loop 2: Retrieve timesheets](#activity-3--loop-2-retrieve-timesheets) |
| 4 | [Loop 3: Total the hours for a project](#activity-4--loop-3-total-the-hours-for-a-project) |
| 5 | [Refactor with an LLM pair](#activity-5--refactor-with-an-llm-pair) |

### The TDD loop

Activities 2 to 5 follow the **red/green/refactor** loop:

1. **Red** – write a unit test for behaviour that doesn't exist yet, and watch it fail.
2. **Green** – write just enough production code to make the test pass (and keep every other test passing).
3. **Refactor** – improve the code while keeping all the tests green.

The book calls unit tests **checks**: a tool can only check the exact things we assert, while people *test* by exploring and questioning.
In this exercise, the checks have a second job. Your agent reads your tests as part of its context, so **every test you write is also a prompt** for the production code that the agent writes next.

### Working with your coding agent

A coding agent can edit many files and run commands on its own. In TDD, that makes it easy to skip steps, so **you** stay in charge of the loop:

- **Send one prompt per step.** Use the prompts given in each activity. They are in English, and each one asks for **one** small change.
- **Read every change before you accept it.** Most agents show a diff that you can keep or undo. If the change does more than the step asks for, undo it, or ask the agent to remove the extra code.
- **Run `npm test` yourself, and make every commit yourself.** Don't let the agent run git commands. If it asks permission to run one, decline.
- **Start a new chat (session) for each activity**, unless a step tells you to stay in the same chat.
- If your agent has a mode that only answers and doesn't edit files (for example, **Ask** mode in Copilot), use it when a step says the agent must not change any files.

> ⚠️ **Experiences may vary.** Agents don't give everyone the same code, and different agents behave differently. Your code may differ from the examples in this README, and that's fine. Check that it does what the step asks for.

---

## Activity 1 – Think before you code: let the LLM ask questions

Before writing any code, we ask the LLM questions about the user story. This is **shift-left testing**: finding ambiguities and risks while the feature is still an idea, when they're cheapest to fix.

### Goals

By the end of this activity you should be able to:

- Use an LLM to generate questions that clarify a user story before you build it.
- Decide which generated questions to act on, which to set aside for later, and which to ignore.

### Step 1 – Ask for clarifying questions

This prompt uses techniques from the earlier exercises: a role, delimiters, rules, two quality characteristics (**accuracy** and **consistency**) and one example of the output. In a **new chat** with your agent, send this prompt:

```text
You are a software testing expert. Analyze the text delimited by triple hashes and generate questions that will clarify ambiguities in the text.
* Questions will be generated by using the What, Where, Why, When, Who and How heuristic
* Multiple questions can be identified for each quality characteristic
* Generate no more than 10 questions in total
* The quality characteristics we care about are: Accuracy and Consistency
* Output questions in the format of Question - Explanation
Example:
What does relevant mean?
The acceptance criteria say relevant search results, but how do we determine what is relevant and what isn't?
###
As a timesheet user
I want to be able to track time against specific projects
So that I can keep a history of how much time I have spent working on individual projects
Features:
- Time is tracked in half hour units
- To complete a timesheet a project and amount of time must be entered
- Only I should be able to see my tracked time
###
```

> 💡 The agent doesn't need to change any files for this activity. You can also send this prompt to a web chatbot such as ChatGPT, Gemini or Claude.

### Step 2 – Sort the questions

1. Copy all the questions from the agent's reply and save them in a file named `questions.md` in the project root (create the file yourself; don't ask the agent to). You will come back to one of these questions in Activity 4.
2. Read every question and sort it into one of three groups by writing the group name next to each question in `questions.md`. You don't need to submit your answers.
   - **Act on now:** for example, "How will the system handle invalid time entries?" reminds us to validate input.
   - **Shelve for later:** for example, a question about many users updating the same timesheet. There is only one user for now, but it might matter later.
   - **Rule out:** for example, a question about time zones. We only track *how much* time was spent, not *when*.

### Key takeaways

- Generated questions make you look at a design from angles you might have missed, even when some of the questions are poor.
- **You decide** which questions matter. The LLM doesn't know your product, your plans or your users.

---

## Activity 2 – Loop 1: Submit a timesheet

### Goals

By the end of this activity you should be able to:

- Prompt a coding agent to write one Jest test, and check that the test says what you want.
- Prompt the agent to write *just enough* production code to pass the test.
- Commit each red and green step of a TDD loop.

### Step 1 – Red: let the agent write the first test

1. In a **new chat** with your agent, send this prompt:
   ```text
   Add one Jest test to tests/timesheet.test.js: test that when a timesheet is submitted with a project name and hours it returns true. Only add this test. Don't change any file in src/.
   ```
2. Read the change. The test should look something like this:
   ```js
   test('submitting a timesheet with a project name and hours returns true', () => {
     const timesheet = new Timesheet();
     const result = timesheet.submitTimesheet('Project 1', 8);
     expect(result).toBe(true);
   });
   ```
   Make sure your test creates a `Timesheet`, calls a `submitTimesheet` method with a project name and a number of hours, and expects `true`. If it doesn't, ask the agent to fix it, or edit it yourself.
3. Run the tests:
   ```bash
   npm test
   ```
   The test **fails** with `TypeError: timesheet.submitTimesheet is not a function`. This is **red**: the method doesn't exist yet.
4. Commit:
   ```bash
   git add .
   git commit -m "loop 1: red"
   ```

> 💡 Tip: Run `npm run test:watch` in a second terminal. Jest then reruns the tests every time a file changes.

### Step 2 – Green: let the test prompt the production code

1. In the **same chat**, send this prompt:
   ```text
   Write just enough code in src/timesheet.js to make the failing test pass. Don't change the tests.
   ```
2. Read the change. "Just enough" for this test is very little, for example:
   ```js
   submitTimesheet(projectName, duration) {
     return true;
   }
   ```
   Agents often write **more** than you asked for, such as input validation or storage. No test checks that code yet, so ask the agent to remove it.
3. Run `npm test`. The test **passes**. This is **green**.
4. Commit:
   ```bash
   git add .
   git commit -m "loop 1: green"
   ```

### Step 3 – Reflect

You don't need to write or submit any answers for this step.

- `return true;` passes the test but does almost nothing. Is that OK in TDD? (Hint: "just enough code to pass".)
- Did your agent write just enough, or more? Why is code that no test checks a risk?

### Key takeaways

- The test is the prompt: the agent wrote the production code from what your test describes.
- An agent tends to do more than you ask. In TDD, **you** decide how big each step is.

---

## Activity 3 – Loop 2: Retrieve timesheets

### Goals

By the end of this activity you should be able to:

- Steer the agent's design by giving it more context in your prompt.
- Spot code that looks right but fails in JavaScript.

### Step 1 – Red: a test for getting the timesheets back

1. In a **new chat** with your agent, send this prompt:
   ```text
   Add one Jest test to tests/timesheet.test.js: test that when timesheets are added they can be retrieved as a list. Only add this test. Don't change any file in src/.
   ```
   The test should look something like this:
   ```js
   test('timesheets that are added can be retrieved as a list', () => {
     const timesheet = new Timesheet();
     timesheet.submitTimesheet('Project 1', 8);
     timesheet.submitTimesheet('Project 2', 8);
     timesheet.submitTimesheet('Project 3', 8);
     expect(timesheet.getTimesheets()).toHaveLength(3);
   });
   ```
   Make sure the test submits **three different projects** and expects `getTimesheets()` to return **3** items.
2. Run `npm test`. The new test fails with `timesheet.getTimesheets is not a function`. Commit with the message `loop 2: red`.

### Step 2 – Green: steer the design

1. In the **same chat**, send this prompt. The first sentence is the design decision:
   ```text
   Store the hours for each project in a Map keyed by project name: timesheets = new Map(). Write just enough code in src/timesheet.js to make the failing test pass. Don't change the tests.
   ```
2. Read the change. It should look something like this:
   ```js
   class Timesheet {
     timesheets = new Map();

     submitTimesheet(projectName, duration) {
       this.timesheets.set(projectName, duration);
       return true;
     }

     getTimesheets() {
       return [...this.timesheets.values()];
     }
   }
   ```
3. Run `npm test` until **both** tests pass. Then commit with the message `loop 2: green`.

**Optional:** undo the change and send the prompt again **without** the first sentence. What design does the agent choose when you don't give it one?

### Step 3 – Reflect

You don't need to write or submit any answers for this step.

- How did the first sentence of the prompt change the code the agent wrote?
- If code runs and *looks* right, is that enough? What would tell you it was wrong?

### Key takeaways

- An agent is only as good as its context. Your prompt, your tests and your existing code all steer what it writes.
- Tests catch wrong code. Without the `toHaveLength(3)` check, the iterator bug would go unnoticed.

---

## Activity 4 – Loop 3: Total the hours for a project

### Goals

By the end of this activity you should be able to:

- Change a generated test so that it drives the design **you** want.
- Use a failing test to find a bug yourself, then steer the agent to the fix.

### Step 1 – Red: you decide the design

Open the `questions.md` file you saved in Activity 1. One of the questions was about updates to the **same project**. There is only one user for now, but the same user may submit time to the same project more than once.

1. In a **new chat** with your agent, send this prompt:
   ```text
   Add one Jest test to tests/timesheet.test.js: test that the total hours worked can be calculated from a list of timesheets from one project. Only add this test. Don't change any file in src/.
   ```
2. Read the test. The agent may add up the hours **inside the test**, for example with `reduce`. That's not the design we want: the `Timesheet` class should calculate the total. Make sure the test looks like this, and ask the agent to change it or edit it yourself if it doesn't:
   ```js
   test('the total hours worked on one project can be calculated', () => {
     const timesheet = new Timesheet();
     timesheet.submitTimesheet('Project 1', 8);
     timesheet.submitTimesheet('Project 1', 8);
     timesheet.submitTimesheet('Project 1', 8);
     const total = timesheet.getTotalTimesheetHours('Project 1');
     expect(total).toBe(24);
   });
   ```
3. Run `npm test`. The test fails because the method doesn't exist. Commit with the message `loop 3: red`.

### Step 2 – Green: find and fix the bug

An agent can often find and fix a bug on its own. In this step, **you** find it first.

1. In the **same chat**, send this prompt:
   ```text
   Add a getTotalTimesheetHours(projectName) method to src/timesheet.js that returns the hours stored for the project. Don't change anything else.
   ```
2. Run `npm test`. The test **still fails**, but for a different reason:
   ```text
   Expected: 24
   Received: 8
   ```
   Before you read on, work out why from the code.

   The `Map` stores **one** value per project, so each `set` overwrites the previous hours instead of adding to them.
3. Steer the agent to the fix. In the **same chat**, send this prompt:
   ```text
   In submitTimesheet, check to see if the project already exists. If it does, add the new duration to the existing total. Don't change the tests.
   ```
   The change should look something like this:
   ```js
   submitTimesheet(projectName, duration) {
     if (this.timesheets.has(projectName)) {
       duration += this.timesheets.get(projectName);
     }
     this.timesheets.set(projectName, duration);
     return true;
   }
   ```
4. Run `npm test` until **all three** tests pass. Commit with the message `loop 3: green`.

> 💡 If your test already passed at the end of Step 2.1, your agent added the hours together without being asked, in this loop or in Loop 2. Look at the code it wrote: which test asked for that behaviour?

### Step 3 – Reflect

You don't need to write or submit any answers for this step.

- The agent's first test may have calculated the total in the test. Why is it better to make the class responsible for it?
- In Step 2 the test failed twice, for two different reasons. What did each failure tell you?

### Key takeaways

- The agent suggests; **you design**. Change generated tests until they describe the behaviour you want.
- A short, specific prompt that names the problem is often enough to steer the agent to the code you need.

---

## Activity 5 – Refactor with an LLM pair

All three tests pass, but the code is getting more complex. Without a colleague to pair with, we ask the LLM to review the code and suggest risks, then decide which suggestions to trust.

### Goals

By the end of this activity you should be able to:

- Use an LLM to review your code for risks and to refactor it.
- Check that a refactoring keeps your tests green.
- Recognise when an LLM's suggestion is wrong or made up (a **hallucination**), and when to stop relying on the LLM.

### Step 1 – Ask for risks

In a **new chat** with your agent, send this prompt. The agent must not change any files in this step, so use a mode that only answers if your agent has one:

```text
You are a software testing expert. Analyze the JavaScript code in src/timesheet.js and identify risks that might impact the code. If no code is provided, respond with "No risks could be found". Don't change any files.
* Risks must be related to the quality characteristics: Accuracy and Consistency
* Multiple risks can be identified for each quality characteristic
* Output identified risks in the format of Risk - Quality Characteristic - Explanation
Example:
Overflow - Security - Adding in large integers as parameters might cause the method to trigger a buffer overflow.
```

### Step 2 – Ask for a refactoring

In the **same chat**, send this follow-up prompt. If you used a mode that only answers, switch to agent mode first. The last sentence asks the agent to check its solution before it finishes, as in the earlier exercises:

```text
Refactor src/timesheet.js to mitigate the risks you suggested. Don't change the tests. Check to see that each risk has been mitigated before you finish.
```

1. Read the change, then run `npm test`.
   - If all the tests pass, the refactoring kept the behaviour your tests describe.
   - If a test fails, decide which is wrong: the refactored code, or your test. For example, did the agent change what `submitTimesheet` returns, or rename a method? Fix the code or the test yourself.
2. When all the tests pass, commit with the message `refactor: apply LLM suggestions`.

### Step 3 – Check the refactoring

In a **new chat**, send the **same prompt as Step 1** again. The agent now analyses your refactored code. Compare the new list of risks with the first one. You don't need to write or submit your answers.

- **Mitigated:** which risks from the first list have really gone? Check the code yourself; don't trust the LLM's word for it.
- **Renamed:** does any "new" risk look like an old one with a different name?
- **Made up:** does the LLM claim the code doesn't handle something that it **does** handle? (For example, a claim that a duration of 0 or less is not handled, when your refactored code already rejects it.) That's a hallucination.
- **Irrelevant:** did the LLM warn about threads or concurrency? JavaScript runs your code on a single thread, so is that risk real here?
- **Missed:** try this in the Node.js REPL (run `node` in the project folder). Did the LLM spot it?
  ```js
  const Timesheet = require('./src/timesheet');
  const t = new Timesheet();
  t.submitTimesheet('Project 1', '8');
  t.submitTimesheet('Project 1', '8');
  t.getTotalTimesheetHours('Project 1');
  ```
  With the code from Activity 4, the result is the **string** `'88'`, not the number `16`: `+` joins strings. What does your refactored code return?

### Key takeaways

- An LLM can act as a quick pair partner for reviewing code, but the quality of its risks varies. Some are concrete and useful; others are vague, irrelevant or made up.
- The more often you ask the same LLM for "more risks", the more likely it is to invent them.
- Your tests are the safety net for an AI-generated refactoring. Always run them.
- Knowing **when to stop relying on the LLM and take charge** is a skill. For example, fix a risk yourself, test first, rather than asking the LLM to refactor again and again.
- In TDD, the tests express **your** design. Coding agents speed up the work, but the analysis and design decisions are yours.
