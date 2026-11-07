# ai4swtesting-tdd

🌐 [English](README.md) | **ภาษาไทย**

แบบฝึกหัดเรื่องการใช้ Generative AI ช่วยในการพัฒนาแบบ **Test-Driven Development (TDD)** สำหรับการบรรยายเรื่อง **AI for Software Testing**
(วิชา 2110724 Software Testing and Quality Assurance)

แบบฝึกหัดนี้อ้างอิงจากตัวอย่าง TDD ในบทที่ 4 ของหนังสือ *Software Testing with Generative AI* (Mark Winteringham, Manning) โดยเปลี่ยนจาก Java และ JUnit มาเป็น **JavaScript และ Jest**
นิสิตจะสร้างระบบจัดการ timesheet ขนาดเล็กทีละรอบของ red/green/refactor โดยมี **coding agent ใน VS Code** ช่วยเขียน test และโค้ด และทำหน้าที่เป็น tester ที่มาจับคู่ทำงาน (pair) กับเราด้วย

## ก่อนเริ่ม

### 1. Fork และ clone repo นี้

นิสิต**ต้อง fork repository นี้**ไปยังบัญชี GitHub ของตัวเอง และทำงานทั้งหมดใน fork ของตัวเอง แบบฝึกหัดนี้ต้องเขียนและรันโค้ด จึงต้องทำ**บนเครื่องคอมพิวเตอร์** ไม่ใช่ผ่านเบราว์เซอร์

1. เข้าสู่ระบบ [GitHub](https://github.com) (ถ้ายังไม่มีบัญชี สมัครได้ฟรี)
2. กดปุ่ม **Fork** ที่มุมขวาบนของหน้านี้ แล้วกด **Create fork**
3. Clone **fork ของตัวเอง** (`https://github.com/<your-username>/ai4swtesting-tdd`) ไม่ใช่ repo ต้นฉบับนี้:
   ```bash
   git clone https://github.com/<your-username>/ai4swtesting-tdd.git
   cd ai4swtesting-tdd
   ```

### 2. ติดตั้งเครื่องมือ

สิ่งที่ต้องมี:

- **Node.js เวอร์ชัน 18 ขึ้นไป** – <https://nodejs.org> (ใช้เวอร์ชัน LTS ได้) ตรวจสอบด้วยคำสั่ง `node --version`
- **Git** – <https://git-scm.com> ตรวจสอบด้วยคำสั่ง `git --version`
- **Visual Studio Code** – <https://code.visualstudio.com>
- **Coding agent ใน VS Code** ใช้ agent ตัวไหนก็ได้ที่อ่านและแก้ไขไฟล์ในโปรเจกต์ได้ เช่น:
  - **GitHub Copilot** ใน agent mode: ติดตั้ง extension GitHub Copilot เปิดหน้า **Chat** แล้วเลือกโหมด **Agent** แผนฟรี (**Copilot Free**) เพียงพอสำหรับแบบฝึกหัดนี้ และถ้านิสิตยืนยันสถานะนักศึกษากับ [GitHub Education](https://education.github.com) แล้ว จะใช้ Copilot Pro ได้ฟรี
  - **OpenAI Codex**, **Claude Code** หรือ **Gemini Code Assist**: ติดตั้ง extension จากหน้า **Extensions** ของ VS Code (`Ctrl+Shift+X` หรือ `Cmd+Shift+X` บน macOS) แล้วเข้าสู่ระบบ บางตัวต้องใช้แผนแบบเสียเงิน ให้ตรวจสอบก่อนเริ่ม
- เวลาประมาณ 1 ชั่วโมง

### 3. ติดตั้งโปรเจกต์และรัน test

ในโฟลเดอร์ของโปรเจกต์ ให้รัน:

```bash
npm install
npm test
```

การรัน test จะ**ล้มเหลว**พร้อมข้อความ `Your test suite must contain at least one test.` ซึ่งเป็นเรื่องปกติ เพราะไฟล์ [`tests/timesheet.test.js`](tests/timesheet.test.js) ยังไม่มี test เลย นิสิตจะเพิ่ม test ในกิจกรรม 2

ในโปรเจกต์มีไฟล์ที่นิสิตต้องแก้ไข 2 ไฟล์:

| ไฟล์ | คืออะไร |
|------|---------|
| [`src/timesheet.js`](src/timesheet.js) | Production code: คลาส `Timesheet` ที่ยังว่างอยู่ |
| [`tests/timesheet.test.js`](tests/timesheet.test.js) | Unit test (Jest): ยังว่างอยู่ มีเพียงบรรทัดที่โหลด `Timesheet` |

### วิธีส่งงาน

นิสิตส่ง**โค้ดพร้อมประวัติการ commit** ไม่ต้องเขียนหรือส่งไฟล์คำตอบใด ๆ
1. **Commit ทุกครั้งที่จบขั้น red, green และ refactor** โดยใช้ commit message ตามที่กำหนดในแต่ละกิจกรรม (เช่น `loop 1: red`) ผู้สอนจะดูจากประวัติการ commit ว่านิสิตเขียน test ก่อนเขียนโค้ดจริง
2. Push commit ทั้งหมดขึ้น fork ของตัวเอง:
   ```bash
   git push
   ```
3. **ส่ง URL ของ fork ตัวเอง** (`https://github.com/<your-username>/ai4swtesting-tdd`) **ใน MyCourseVille** และตรวจสอบให้แน่ใจว่างานทั้งหมด commit และ push แล้ว

## ฟีเจอร์ที่จะสร้าง: ระบบจัดการ timesheet

### Timesheet คืออะไร

**Timesheet** คือบันทึกว่าเราใช้เวลาทำงานกับงานแต่ละอย่างไปเท่าไร บริษัทซอฟต์แวร์และบริษัทที่ปรึกษามักให้พนักงานกรอก timesheet ทุกวันหรือทุกสัปดาห์ เช่น "วันนี้ทำ Project A 3 ชั่วโมง และ Project B 4.5 ชั่วโมง" แล้วนำข้อมูลไปใช้ เช่น เก็บเงินลูกค้าตามชั่วโมงที่ทำจริง ประเมินว่าโปรเจกต์ใช้เวลาเกินแผนหรือไม่ หรือดูว่าพนักงานแต่ละคนมีงานมากเกินไปหรือเปล่า

### สิ่งที่เราจะสร้างในแบบฝึกหัดนี้

เราจะสร้างเฉพาะ**ส่วน logic หลัก**ของระบบ ในรูปของคลาส JavaScript ชื่อ `Timesheet` เพียงคลาสเดียว ใน [`src/timesheet.js`](src/timesheet.js):

- **ไม่มี** หน้าจอ (UI), เว็บเซิร์ฟเวอร์ หรือฐานข้อมูล ข้อมูลทั้งหมดเก็บอยู่ในหน่วยความจำ (in memory) ของ object และหายไปเมื่อโปรแกรมจบ
- เราใช้งานคลาสนี้ผ่าน **unit test** เท่านั้น test จึงเป็นทั้งตัวตรวจสอบและเป็น "ผู้ใช้" คนแรกของโค้ด
- ตอนเริ่มต้น คลาส `Timesheet` ยังว่างอยู่ ทุกเมธอดจะเกิดขึ้นจาก test ที่เราเขียนก่อน

เมื่อทำครบทุกกิจกรรม คลาส `Timesheet` จะทำได้ 3 อย่าง:

| กิจกรรม | ความสามารถที่เพิ่มเข้ามา |
|---------|------------------------|
| 2 | **ส่ง timesheet**: บันทึกว่าทำโปรเจกต์ไหนกี่ชั่วโมง |
| 3 | **ดึงรายการ timesheet**: ดูรายการเวลาที่บันทึกไว้ทั้งหมด |
| 4 | **รวมชั่วโมงของโปรเจกต์**: คำนวณว่าใช้เวลากับโปรเจกต์หนึ่งไปทั้งหมดกี่ชั่วโมง |

ส่วนกิจกรรม 5 ไม่ได้เพิ่มความสามารถใหม่ แต่ปรับปรุงโค้ดที่มีอยู่ให้ดีขึ้น

> 💡 User story ด้านล่างเขียนจากมุมมองของผู้ใช้ จึงมีบางเรื่องที่ยังไม่ชัดเจน และบางข้อเราจะไม่ได้สร้างในแบบฝึกหัดนี้ ซึ่งเป็นเรื่องปกติของงานจริง

### User story

ทุกกิจกรรมจะสร้างส่วนต่าง ๆ ของ user story นี้:

> ในฐานะผู้ใช้ timesheet ฉันต้องการบันทึกเวลาที่ใช้กับแต่ละโปรเจกต์ได้ เพื่อเก็บประวัติว่าฉันใช้เวลาทำงานในแต่ละโปรเจกต์ไปเท่าไร
>
> **ฟีเจอร์:**
> - บันทึกเวลาเป็นหน่วยครึ่งชั่วโมง
> - การกรอก timesheet ให้ครบต้องระบุโปรเจกต์และจำนวนเวลา
> - เวลาที่บันทึกไว้ต้องเห็นได้เฉพาะตัวฉันเท่านั้น

## รายการกิจกรรม

| # | กิจกรรม |
|---|---------|
| 1 | [คิดก่อนเขียนโค้ด: ให้ LLM ช่วยตั้งคำถาม](#กิจกรรม-1--คิดก่อนเขียนโค้ด-ให้-llm-ช่วยตั้งคำถาม) |
| 2 | [Loop 1: ส่ง timesheet](#กิจกรรม-2--loop-1-ส่ง-timesheet) |
| 3 | [Loop 2: ดึงรายการ timesheet](#กิจกรรม-3--loop-2-ดึงรายการ-timesheet) |
| 4 | [Loop 3: รวมชั่วโมงของโปรเจกต์](#กิจกรรม-4--loop-3-รวมชั่วโมงของโปรเจกต์) |
| 5 | [Refactor โดยมี LLM เป็นคู่หู](#กิจกรรม-5--refactor-โดยมี-llm-เป็นคู่หู) |

### วงจร TDD

กิจกรรม 2 ถึง 5 ใช้วงจร **red/green/refactor**:
<img width="1529" height="565" alt="red-green-refactor" src="https://github.com/user-attachments/assets/2b4b0614-bea6-40c0-b779-c8f5498dd640" />
1. **Red** – เขียน unit test สำหรับพฤติกรรมที่ยังไม่มีอยู่ แล้วดูให้เห็นว่า test ล้มเหลว
2. **Green** – เขียน production code ให้น้อยที่สุดเท่าที่จำเป็นเพื่อให้ test ผ่าน (และ test อื่นทั้งหมดยังต้องผ่าน)
3. **Refactor** – ปรับปรุงโค้ดให้ดีขึ้น โดยที่ test ทั้งหมดยังผ่าน (green) อยู่

เราจะเรียก unit test ว่า **check** เพราะเครื่องมือตรวจได้เฉพาะสิ่งที่เรา assert ไว้อย่างชัดเจนเท่านั้น ส่วนคน*ทดสอบ (test)* ด้วยการสำรวจและตั้งคำถาม
ในแบบฝึกหัดนี้ check มีหน้าที่ที่สองด้วย agent อ่าน test ของเราเป็นส่วนหนึ่งของบริบท (context) ดังนั้น **test ทุกตัวที่นิสิตเขียนก็เป็น prompt ด้วย** สำหรับ production code ที่ agent จะเขียนต่อไป

### การทำงานกับ coding agent

Coding agent แก้ไขไฟล์ได้หลายไฟล์และรันคำสั่งได้เอง ใน TDD จึงข้ามขั้นตอนได้ง่าย **เราต้องเป็นคนคุม**วงจรเอง:

- **ส่ง prompt หนึ่งครั้งต่อหนึ่งขั้น:** ใช้ prompt ที่ให้ไว้ในแต่ละกิจกรรม (เป็นภาษาอังกฤษ) ซึ่งแต่ละอันขอให้เปลี่ยนแปลงเล็ก ๆ **เพียงอย่างเดียว**
- **อ่านทุกการเปลี่ยนแปลงก่อนรับ:** agent ส่วนใหญ่แสดง diff ให้เลือกเก็บ (keep) หรือยกเลิก (undo) ถ้าการเปลี่ยนแปลงทำมากกว่าที่ขั้นนั้นขอ ให้ยกเลิก หรือขอให้ agent ลบโค้ดส่วนเกินออก
- **รัน `npm test` เอง และ commit เองทุกครั้ง:** อย่าให้ agent รันคำสั่ง git ถ้า agent ขออนุญาตรัน ให้ปฏิเสธ
- **เปิดแชตใหม่ (session ใหม่) ทุกครั้งที่เริ่มกิจกรรมใหม่:** ยกเว้นขั้นที่บอกให้ใช้แชตเดิม
- ถ้า agent มีโหมดที่ตอบอย่างเดียวโดยไม่แก้ไฟล์ (เช่น โหมด **Ask** ของ Copilot) ให้ใช้โหมดนั้นในขั้นที่ระบุว่า agent ห้ามแก้ไขไฟล์

> ⚠️ **ผลลัพธ์อาจไม่เหมือนกัน** agent ไม่ได้เขียนโค้ดเหมือนกันทุกคน และ agent แต่ละตัวก็ทำงานต่างกัน โค้ดที่นิสิตได้อาจต่างจากตัวอย่างใน README นี้ ซึ่งไม่เป็นไร ให้ตรวจสอบว่าโค้ดทำงานตามที่ขั้นนั้นต้องการ

---

## กิจกรรม 1 – คิดก่อนเขียนโค้ด: ให้ LLM ช่วยตั้งคำถาม

ก่อนเขียนโค้ด เราจะให้ LLM ช่วยตั้งคำถามเกี่ยวกับ user story วิธีนี้เรียกว่า **shift-left testing** คือการหาจุดที่กำกวมและความเสี่ยงตั้งแต่ฟีเจอร์ยังเป็นแค่ไอเดีย ซึ่งเป็นช่วงที่แก้ไขได้ง่ายและถูกที่สุด

### เป้าหมาย

เมื่อทำกิจกรรมนี้เสร็จ นิสิตควรจะสามารถ:

- ใช้ LLM สร้างคำถามที่ช่วยทำให้ user story ชัดเจนขึ้นก่อนลงมือสร้าง
- ตัดสินใจได้ว่าคำถามข้อไหนควรนำไปทำต่อ ข้อไหนเก็บไว้คิดทีหลัง และข้อไหนไม่ต้องสนใจ

### ขั้นที่ 1 – ขอคำถามที่ช่วยให้ชัดเจนขึ้น

Prompt นี้ใช้เทคนิคจากแบบฝึกหัดก่อนหน้า ได้แก่ การกำหนดบทบาท delimiter กฎ quality characteristic 2 ตัว (**accuracy** และ **consistency**) และตัวอย่าง (example หรือ shot) ของผลลัพธ์ 1 ตัวอย่าง เปิด**แชตใหม่**กับ agent แล้วส่ง prompt นี้:

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

> 💡 กิจกรรมนี้ agent ไม่ต้องแก้ไขไฟล์ใด ๆ จะส่ง prompt นี้ให้ chatbot บนเว็บ เช่น ChatGPT, Gemini หรือ Claude แทนก็ได้

### ขั้นที่ 2 – จัดกลุ่มคำถาม

1. คัดลอกคำถามทั้งหมดที่ agent ตอบมา แล้วบันทึกลงไฟล์ `questions.md` ที่ root ของโปรเจกต์ (สร้างไฟล์เอง อย่าให้ agent สร้าง) เราจะกลับมาใช้คำถามข้อหนึ่งในไฟล์นี้อีกในกิจกรรม 4
2. อ่านคำถามทุกข้อ แล้วจัดเข้ากลุ่มใดกลุ่มหนึ่งใน 3 กลุ่มนี้ โดยเขียนชื่อกลุ่มกำกับไว้หน้าคำถามแต่ละข้อใน `questions.md` ขั้นนี้ไม่ต้องส่งคำตอบ
   - **ทำทันที:** เช่น "How will the system handle invalid time entries?" เตือนให้เราตรวจสอบความถูกต้องของข้อมูลที่รับเข้ามา (input validation)
   - **เก็บไว้ทีหลัง:** เช่น คำถามเรื่องผู้ใช้หลายคนแก้ไข timesheet เดียวกัน ตอนนี้มีผู้ใช้คนเดียว แต่อาจสำคัญในอนาคต
   - **ตัดทิ้ง:** เช่น คำถามเรื่อง time zone เพราะเราบันทึกแค่ว่าใช้เวลา*เท่าไร* ไม่ได้บันทึกว่า*เมื่อไร*

### สรุปประเด็นสำคัญ

- คำถามที่ LLM สร้างขึ้นช่วยให้เรามองการออกแบบจากมุมที่อาจมองข้ามไป แม้คำถามบางข้อจะไม่ค่อยดีก็ตาม
- **เราเป็นคนตัดสินใจ**ว่าคำถามข้อไหนสำคัญ LLM ไม่รู้จักผลิตภัณฑ์ แผนงาน หรือผู้ใช้ของเรา

---

## กิจกรรม 2 – Loop 1: ส่ง timesheet

### เป้าหมาย

เมื่อทำกิจกรรมนี้เสร็จ นิสิตควรจะสามารถ:

- สั่ง coding agent ให้เขียน Jest test หนึ่งตัว และตรวจสอบว่า test บอกสิ่งที่เราต้องการ
- สั่ง agent ให้เขียน production code *ให้น้อยที่สุดเท่าที่จำเป็น*เพื่อให้ test ผ่าน
- Commit ทุกขั้น red และ green ของวงจร TDD

### ขั้นที่ 1 – Red: ให้ agent เขียน test แรก

1. เปิด**แชตใหม่**กับ agent แล้วส่ง prompt นี้:
   ```text
   Add one Jest test to tests/timesheet.test.js: test that when a timesheet is submitted with a project name and hours it returns true. Only add this test. Don't change any file in src/.
   ```
2. อ่านการเปลี่ยนแปลง test ควรมีหน้าตาคล้าย ๆ แบบนี้:
   ```js
   test('submitting a timesheet with a project name and hours returns true', () => {
     const timesheet = new Timesheet();
     const result = timesheet.submitTimesheet('Project 1', 8);
     expect(result).toBe(true);
   });
   ```
   ตรวจสอบว่า test สร้าง `Timesheet` เรียกเมธอด `submitTimesheet` โดยส่งชื่อโปรเจกต์และจำนวนชั่วโมง และคาดหวังผลเป็น `true` ถ้าไม่ใช่ ให้ขอให้ agent แก้ หรือแก้เอง
3. รัน test:
   ```bash
   npm test
   ```
   Test จะ**ล้มเหลว**พร้อมข้อความ `TypeError: timesheet.submitTimesheet is not a function` นี่คือ **red** เพราะเมธอดยังไม่มีอยู่จริง
4. Commit:
   ```bash
   git add .
   git commit -m "loop 1: red"
   ```

> 💡 เคล็ดลับ: เปิด terminal อีกหน้าต่างแล้วรัน `npm run test:watch` ไว้ Jest จะรัน test ใหม่ทุกครั้งที่ไฟล์เปลี่ยน

### ขั้นที่ 2 – Green: ให้ test เป็น prompt ของ production code

1. ใน**แชตเดิม** ให้ส่ง prompt นี้:
   ```text
   Write just enough code in src/timesheet.js to make the failing test pass. Don't change the tests.
   ```
2. อ่านการเปลี่ยนแปลง โค้ดที่ "น้อยที่สุดเท่าที่จำเป็น" สำหรับ test นี้มีนิดเดียว เช่น:
   ```js
   submitTimesheet(projectName, duration) {
     return true;
   }
   ```
   Agent มักเขียนโค้ด**มากกว่า**ที่ขอ เช่น การตรวจสอบ input หรือการเก็บข้อมูล ซึ่งยังไม่มี test ไหนตรวจโค้ดส่วนนั้น ให้ขอให้ agent ลบออก
3. รัน `npm test` test จะ**ผ่าน** นี่คือ **green**
4. Commit:
   ```bash
   git add .
   git commit -m "loop 1: green"
   ```

### ขั้นที่ 3 – สะท้อนคิด

ขั้นนี้ไม่ต้องเขียนหรือส่งคำตอบ

- `return true;` ทำให้ test ผ่านแต่แทบไม่ได้ทำอะไรเลย แบบนี้ถือว่าใช้ได้ใน TDD หรือไม่ (คำใบ้: "เขียนโค้ดให้น้อยที่สุดเท่าที่จำเป็นเพื่อให้ test ผ่าน")
- Agent ของเราเขียนแค่พอดี หรือเขียนเกินมา ทำไมโค้ดที่ไม่มี test ตรวจถึงเป็นความเสี่ยง

### สรุปประเด็นสำคัญ

- Test คือ prompt: agent เขียน production code จากสิ่งที่ test ของเราอธิบายไว้
- Agent มักทำมากกว่าที่ขอ ใน TDD **เรา**เป็นคนกำหนดว่าแต่ละขั้นใหญ่แค่ไหน

---

## กิจกรรม 3 – Loop 2: ดึงรายการ timesheet

### เป้าหมาย

เมื่อทำกิจกรรมนี้เสร็จ นิสิตควรจะสามารถ:

- กำหนดทิศทางการออกแบบของ agent ด้วยการให้บริบทเพิ่มใน prompt
- สังเกตเห็นโค้ดที่ดูเหมือนถูกแต่ใช้ไม่ได้ใน JavaScript

### ขั้นที่ 1 – Red: test สำหรับดึง timesheet กลับมา

1. เปิด**แชตใหม่**กับ agent แล้วส่ง prompt นี้:
   ```text
   Add one Jest test to tests/timesheet.test.js: test that when timesheets are added they can be retrieved as a list. Only add this test. Don't change any file in src/.
   ```
   Test ควรมีหน้าตาคล้าย ๆ แบบนี้:
   ```js
   test('timesheets that are added can be retrieved as a list', () => {
     const timesheet = new Timesheet();
     timesheet.submitTimesheet('Project 1', 8);
     timesheet.submitTimesheet('Project 2', 8);
     timesheet.submitTimesheet('Project 3', 8);
     expect(timesheet.getTimesheets()).toHaveLength(3);
   });
   ```
   ตรวจสอบว่า test ส่ง timesheet ของ**โปรเจกต์ที่ต่างกัน 3 โปรเจกต์** และคาดหวังให้ `getTimesheets()` คืนค่า **3** รายการ
2. รัน `npm test` test ใหม่จะล้มเหลวพร้อมข้อความ `timesheet.getTimesheets is not a function` แล้ว commit ด้วย message `loop 2: red`

### ขั้นที่ 2 – Green: กำหนดทิศทางการออกแบบ

1. ใน**แชตเดิม** ให้ส่ง prompt นี้ ประโยคแรกคือการตัดสินใจเรื่องการออกแบบ:
   ```text
   Store the hours for each project in a Map keyed by project name: timesheets = new Map(). Write just enough code in src/timesheet.js to make the failing test pass. Don't change the tests.
   ```
2. อ่านการเปลี่ยนแปลง ควรมีหน้าตาคล้าย ๆ แบบนี้:
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
3. รัน `npm test` จน test **ทั้งสองตัว**ผ่าน แล้ว commit ด้วย message `loop 2: green`

**ทำเพิ่มเติม (ไม่บังคับ):** ยกเลิกการเปลี่ยนแปลง แล้วส่ง prompt อีกครั้ง**โดยไม่มี**ประโยคแรก agent เลือกการออกแบบแบบไหนเมื่อเราไม่ได้กำหนดให้

### ขั้นที่ 3 – สะท้อนคิด

ขั้นนี้ไม่ต้องเขียนหรือส่งคำตอบ

- ประโยคแรกของ prompt เปลี่ยนโค้ดที่ agent เขียนอย่างไร
- ถ้าโค้ดรันได้และ*ดู*ถูกต้อง เท่านั้นพอหรือไม่ อะไรจะบอกเราได้ว่ามันผิด

### สรุปประเด็นสำคัญ

- Agent ดีได้เท่ากับบริบทที่มันได้รับ prompt, test และโค้ดที่มีอยู่แล้วล้วนกำหนดทิศทางของสิ่งที่มันเขียน
- Test จับโค้ดที่ผิดได้ ถ้าไม่มี check `toHaveLength(3)` บั๊กเรื่อง iterator ก็จะหลุดไปโดยไม่มีใครรู้

---

## กิจกรรม 4 – Loop 3: รวมชั่วโมงของโปรเจกต์

### เป้าหมาย

เมื่อทำกิจกรรมนี้เสร็จ นิสิตควรจะสามารถ:

- แก้ test ที่ถูกสร้างขึ้น ให้ขับเคลื่อนการออกแบบตามที่**เรา**ต้องการ
- ใช้ test ที่ล้มเหลวเพื่อหาบั๊กด้วยตัวเอง แล้วนำทาง agent ไปสู่การแก้ไข

### ขั้นที่ 1 – Red: เราเป็นคนตัดสินใจเรื่องการออกแบบ

เปิดไฟล์ `questions.md` ที่บันทึกไว้ในกิจกรรม 1 คำถามข้อหนึ่งเกี่ยวกับการบันทึกเวลาให้**โปรเจกต์เดียวกัน** ตอนนี้มีผู้ใช้คนเดียว แต่ผู้ใช้คนเดียวกันก็อาจส่งเวลาให้โปรเจกต์เดิมได้หลายครั้ง

1. เปิด**แชตใหม่**กับ agent แล้วส่ง prompt นี้:
   ```text
   Add one Jest test to tests/timesheet.test.js: test that the total hours worked can be calculated from a list of timesheets from one project. Only add this test. Don't change any file in src/.
   ```
2. อ่าน test agent อาจรวมชั่วโมง**ภายใน test เอง** เช่น ใช้ `reduce` ซึ่งไม่ใช่การออกแบบที่เราต้องการ คลาส `Timesheet` ควรเป็นผู้คำนวณผลรวม ตรวจสอบให้ test มีหน้าตาแบบนี้ ถ้าไม่ใช่ ให้ขอให้ agent แก้ หรือแก้เอง:
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
3. รัน `npm test` test จะล้มเหลวเพราะยังไม่มีเมธอดนี้ แล้ว commit ด้วย message `loop 3: red`

### ขั้นที่ 2 – Green: หาบั๊กแล้วแก้

Agent มักหาบั๊กและแก้เองได้ แต่ในขั้นนี้ **เรา**จะหาบั๊กให้เจอก่อน

1. ใน**แชตเดิม** ให้ส่ง prompt นี้:
   ```text
   Add a getTotalTimesheetHours(projectName) method to src/timesheet.js that returns the hours stored for the project. Don't change anything else.
   ```
2. รัน `npm test` test **ยังล้มเหลว** แต่ด้วยเหตุผลที่ต่างออกไป:
   ```text
   Expected: 24
   Received: 8
   ```
   ก่อนอ่านต่อ ให้ลองหาสาเหตุจากโค้ดด้วยตัวเอง

   `Map` เก็บค่าได้**ค่าเดียว**ต่อโปรเจกต์ การ `set` แต่ละครั้งจึงเขียนทับชั่วโมงเดิม แทนที่จะบวกเพิ่ม
3. นำทาง agent ไปสู่การแก้ไข ใน**แชตเดิม** ให้ส่ง prompt นี้:
   ```text
   In submitTimesheet, check to see if the project already exists. If it does, add the new duration to the existing total. Don't change the tests.
   ```
   การเปลี่ยนแปลงควรมีหน้าตาคล้าย ๆ แบบนี้:
   ```js
   submitTimesheet(projectName, duration) {
     if (this.timesheets.has(projectName)) {
       duration += this.timesheets.get(projectName);
     }
     this.timesheets.set(projectName, duration);
     return true;
   }
   ```
4. รัน `npm test` จน test **ทั้งสามตัว**ผ่าน แล้ว commit ด้วย message `loop 3: green`

> 💡 ถ้า test ผ่านไปแล้วตั้งแต่จบข้อ 2.1 แสดงว่า agent บวกชั่วโมงให้เองโดยไม่ได้ถูกขอ ไม่ว่าจะใน loop นี้หรือใน Loop 2 ลองดูโค้ดที่มันเขียน: test ไหนขอพฤติกรรมนั้น

### ขั้นที่ 3 – สะท้อนคิด

ขั้นนี้ไม่ต้องเขียนหรือส่งคำตอบ

- Test แรกที่ agent เขียนอาจคำนวณผลรวมใน test ทำไมการให้คลาสรับผิดชอบการคำนวณจึงดีกว่า
- ในขั้นที่ 2 test ล้มเหลวสองครั้งด้วยเหตุผลต่างกัน ความล้มเหลวแต่ละครั้งบอกอะไรเรา

### สรุปประเด็นสำคัญ

- Agent เป็นผู้เสนอ ส่วน**เราเป็นผู้ออกแบบ** แก้ test ที่ถูกสร้างขึ้นจนกว่าจะอธิบายพฤติกรรมที่เราต้องการ
- Prompt สั้น ๆ ที่เจาะจงและระบุปัญหาชัดเจน มักเพียงพอที่จะนำทาง agent ไปสู่โค้ดที่เราต้องการ

---

## กิจกรรม 5 – Refactor โดยมี LLM เป็นคู่หู

ตอนนี้ test ทั้งสามตัวผ่านแล้ว แต่โค้ดเริ่มซับซ้อนขึ้น เมื่อไม่มีเพื่อนร่วมงานมาจับคู่ เราจะขอให้ LLM รีวิวโค้ดและเสนอความเสี่ยง แล้วตัดสินใจเองว่าจะเชื่อข้อเสนอไหน

### เป้าหมาย

เมื่อทำกิจกรรมนี้เสร็จ นิสิตควรจะสามารถ:

- ใช้ LLM รีวิวโค้ดเพื่อหาความเสี่ยง และ refactor โค้ด
- ตรวจสอบว่าการ refactor ยังทำให้ test ผ่านอยู่
- สังเกตได้ว่าเมื่อไรข้อเสนอของ LLM ผิดหรือถูกแต่งขึ้นมา (**hallucination**) และเมื่อไรควรเลิกพึ่ง LLM

### ขั้นที่ 1 – ขอให้หาความเสี่ยง

เปิด**แชตใหม่**กับ agent แล้วส่ง prompt นี้ ในขั้นนี้ agent ห้ามแก้ไขไฟล์ ถ้า agent มีโหมดที่ตอบอย่างเดียว ให้ใช้โหมดนั้น:

```text
You are a software testing expert. Analyze the JavaScript code in src/timesheet.js and identify risks that might impact the code. If no code is provided, respond with "No risks could be found". Don't change any files.
* Risks must be related to the quality characteristics: Accuracy and Consistency
* Multiple risks can be identified for each quality characteristic
* Output identified risks in the format of Risk - Quality Characteristic - Explanation
Example:
Overflow - Security - Adding in large integers as parameters might cause the method to trigger a buffer overflow.
```

### ขั้นที่ 2 – ขอให้ refactor

ใน**แชตเดิม** ให้ส่ง prompt ต่อไปนี้ ถ้าใช้โหมดที่ตอบอย่างเดียวอยู่ ให้เปลี่ยนเป็น agent mode ก่อน ประโยคสุดท้ายขอให้ agent ตรวจคำตอบของตัวเองก่อนทำเสร็จ เหมือนในแบบฝึกหัดก่อนหน้า:

```text
Refactor src/timesheet.js to mitigate the risks you suggested. Don't change the tests. Check to see that each risk has been mitigated before you finish.
```

1. อ่านการเปลี่ยนแปลง แล้วรัน `npm test`
   - ถ้า test ผ่านทั้งหมด แสดงว่าการ refactor ยังคงพฤติกรรมตามที่ test ของเราอธิบายไว้
   - ถ้ามี test ล้มเหลว ให้ตัดสินใจว่าอะไรผิด ระหว่างโค้ดที่ refactor แล้ว หรือ test ของเรา เช่น agent เปลี่ยนค่าที่ `submitTimesheet` คืนกลับมา หรือเปลี่ยนชื่อเมธอดหรือไม่ แล้วแก้โค้ดหรือ test เอง
2. เมื่อ test ผ่านทั้งหมดแล้ว ให้ commit ด้วย message `refactor: apply LLM suggestions`

### ขั้นที่ 3 – ตรวจผลการ refactor

เปิด**แชตใหม่** แล้วส่ง **prompt เดียวกับขั้นที่ 1** อีกครั้ง คราวนี้ agent จะวิเคราะห์โค้ดที่ refactor แล้ว เปรียบเทียบรายการความเสี่ยงใหม่กับรายการแรก ขั้นนี้ไม่ต้องเขียนหรือส่งคำตอบ

- **แก้แล้วจริง:** ความเสี่ยงข้อไหนจากรายการแรกหายไปจริง ๆ ให้ตรวจโค้ดด้วยตัวเอง อย่าเชื่อแค่คำพูดของ LLM
- **เปลี่ยนชื่อ:** มีความเสี่ยง "ใหม่" ข้อไหนที่ดูเหมือนข้อเดิมแต่เปลี่ยนชื่อหรือไม่
- **แต่งขึ้นมา:** LLM อ้างว่าโค้ดไม่ได้จัดการบางกรณี ทั้งที่จริง ๆ จัดการ**แล้ว**หรือไม่ (เช่น อ้างว่าไม่ได้จัดการ duration ที่เป็น 0 หรือติดลบ ทั้งที่โค้ดที่ refactor แล้วปฏิเสธไว้แล้ว) นั่นคือ hallucination
- **ไม่เกี่ยวข้อง:** LLM เตือนเรื่อง thread หรือ concurrency หรือไม่ JavaScript รันโค้ดของเราบน thread เดียว ความเสี่ยงนี้มีอยู่จริงในกรณีนี้หรือไม่
- **มองข้ามไป:** ลองรันโค้ดนี้ใน Node.js REPL (พิมพ์ `node` ในโฟลเดอร์ของโปรเจกต์) LLM มองเห็นปัญหานี้หรือไม่
  ```js
  const Timesheet = require('./src/timesheet');
  const t = new Timesheet();
  t.submitTimesheet('Project 1', '8');
  t.submitTimesheet('Project 1', '8');
  t.getTotalTimesheetHours('Project 1');
  ```
  กับโค้ดจากกิจกรรม 4 ผลลัพธ์คือ **string** `'88'` ไม่ใช่ตัวเลข `16` เพราะ `+` ต่อ string เข้าด้วยกัน โค้ดที่ refactor แล้วของเราคืนค่าอะไร

### สรุปประเด็นสำคัญ

- LLM ทำหน้าที่เป็นคู่หูรีวิวโค้ดแบบรวดเร็วได้ แต่คุณภาพของความเสี่ยงที่เสนอนั้นไม่แน่นอน บางข้อชัดเจนและมีประโยชน์ บางข้อกว้างเกินไป ไม่เกี่ยวข้อง หรือถูกแต่งขึ้นมา
- ยิ่งขอ "ความเสี่ยงเพิ่มเติม" จาก LLM ตัวเดิมบ่อยเท่าไร ก็ยิ่งมีโอกาสที่มันจะแต่งขึ้นมามากเท่านั้น
- Test ของเราคือตาข่ายรองรับ (safety net) สำหรับการ refactor ที่ AI สร้างขึ้น ต้องรัน test ทุกครั้ง
- การรู้ว่า**เมื่อไรควรเลิกพึ่ง LLM แล้วลงมือเอง**เป็นทักษะ เช่น แก้ความเสี่ยงด้วยตัวเองโดยเขียน test ก่อน แทนที่จะขอให้ LLM refactor ซ้ำไปเรื่อย ๆ
- ใน TDD test คือสิ่งที่แสดงการออกแบบของ**เรา** coding agent ช่วยให้ทำงานได้เร็วขึ้น แต่การวิเคราะห์และการตัดสินใจเรื่องการออกแบบเป็นของเรา
