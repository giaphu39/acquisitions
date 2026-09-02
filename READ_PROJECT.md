# 🧭 LỘ TRÌNH ĐỌC HIỂU TOÀN DIỆN DỰ ÁN ACQUISITIONS (READ_PROJECT)

> **Mục tiêu**: Hướng dẫn phương pháp đọc dự án theo đúng trình tự xây dựng trong [demo_raw_quickstart.md](./demo_raw_quickstart.md), giúp bạn làm chủ 100% kiến trúc Backend & DevOps chuẩn Production để có thể **tự tay code lại dự án từ số 0**.

---

## 🗺️ Ma trận Lộ trình Đọc & Tái hiện Dự án

| Bước | Giai đoạn (Theo Demo Raw) | File cốt lõi cần đọc | Trọng tâm tri thức |
| :--- | :--- | :--- | :--- |
| **1** | Khởi tạo Runtime & Entry Point | [`package.json`](./package.json), [`src/index.js`](./src/index.js), [`src/server.js`](./src/server.js), [`src/app.js`](./src/app.js) | Tách biệt `App` vs `Server` vs `Index`, ESM modules |
| **2** | Tiêu chuẩn Code & Linting | [`eslint.config.js`](./eslint.config.js), [`.prettierrc`](./.prettierrc) | Flat config ESLint v9, Prettier rules, `-D` flag |
| **3** | Database & ORM Layer | [`drizzle.config.js`](./drizzle.config.js), [`src/config/database.js`](./src/config/database.js), [`src/models/user.model.js`](./src/models/user.model.js) | Drizzle lifecycle (`generate`/`migrate`), Neon Serverless HTTP |
| **4** | Subpath Imports & Quan sát (Logging) | [`package.json`](./package.json), [`src/config/logger.js`](./src/config/logger.js), [`src/app.js`](./src/app.js) | Native Subpath Imports (`#*`), Winston + Morgan stream, Helmet |
| **5** | Xác thực & Chuẩn hóa dữ liệu | [`src/validations/auth.validation.js`](./src/validations/auth.validation.js), [`src/services/auth.service.js`](./src/services/auth.service.js), [`src/controllers/auth.controller.js`](./src/controllers/auth.controller.js), [`src/routes/auth.routes.js`](./src/routes/auth.routes.js), [`src/utils/`](./src/utils/) | Luồng Route -> Controller -> Service -> Model, Zod, JWT qua Cookie |
| **6** | Bảo mật Chuyên sâu & Chống Bot/DDoS | [`src/config/arcjet.js`](./src/config/arcjet.js), [`src/middleware/security.middleware.js`](./src/middleware/security.middleware.js) | Arcjet Shield, Bot Detection, Role-based Sliding Window Rate Limit |
| **7** | Quản lý Người dùng & Phân quyền RBAC | [`src/routes/users.routes.js`](./src/routes/users.routes.js), [`src/controllers/users.controller.js`](./src/controllers/users.controller.js), [`src/services/users.service.js`](./src/services/users.service.js), [`src/middleware/auth.middleware.js`](./src/middleware/auth.middleware.js) | Middleware `authenticateToken`, `requireRole`, chống Privilege Escalation |
| **8** | Container hóa & Quản lý Môi trường | [`Dockerfile`](./Dockerfile), [`docker-compose.dev.yml`](./docker-compose.dev.yml), [`docker-compose.prod.yml`](./docker-compose.prod.yml), [`scripts/dev.sh`](./scripts/dev.sh), [`scripts/prod.sh`](./scripts/prod.sh) | Multi-stage Docker, Neon Local vs Cloud, tự động hóa shell scripts |
| **9** | Kiểm thử Tự động (Automated Testing) | [`jest.config.mjs`](./jest.config.mjs), [`tests/app.test.js`](./tests/app.test.js) | Native ESM testing, Supertest, Mock Arcjet trong Test Env |
| **10** | Tự động hóa CI/CD | [`.github/workflows/lint-and-format.yml`](./.github/workflows/lint-and-format.yml), [`.github/workflows/tests.yml`](./.github/workflows/tests.yml), [`.github/workflows/docker-build-and-push.yml`](./.github/workflows/docker-build-and-push.yml) | GitHub Actions pipeline: Lint -> Test & Coverage -> Docker Hub push |

---

## 📌 Hướng Dẫn Chi Tiết Từng Bước (10 Bước)

---

### BƯỚC 1: Khởi tạo Runtime & Phân Tách Kiến Trúc Khởi Động
*(Đối chiếu dòng 1 - 20 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`package.json`](./package.json) (xem `"type": "module"`, scripts `"dev"`, `"start"`)
  - [`src/index.js`](./src/index.js)
  - [`src/server.js`](./src/server.js)
  - [`src/app.js`](./src/app.js)
- **Đọc kỹ thế nào**:
  - Xem cách chia tách 3 tầng khởi động: `index.js` chỉ là điểm kích hoạt gọi `server.js`; `server.js` quản lý HTTP lifecycle và lắng nghe port; `app.js` khởi tạo Express instance, gắn middleware và định tuyến routes.
  - Chú ý cờ `node --watch src/index.js` (tính năng native của Node.js >= 18 thay thế nodemon).
- **Hiểu những gì**:
  - **Separation of Concerns (SoC)**: Tách `app` khỏi `server.listen` là bắt buộc để phục vụ việc viết Integration Test với Supertest (không bị chiếm dụng port khi test).
- **Checklist tự vấn (Tự trả lời được là ĐÃ HIỂU)**:
  1. *Tại sao không gộp tất cả cấu hình middleware, route và `app.listen()` vào một file duy nhất?*
  2. *Cờ `--watch` khác gì việc chạy `node index.js` thông thường?*
  3. *Tại sao phải khai báo `"type": "module"` trong `package.json`?*

---

### BƯỚC 2: Tiêu Chuẩn Hóa Code Quality & Formatting
*(Đối chiếu dòng 21 - 32 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`eslint.config.js`](./eslint.config.js)
  - [`.prettierrc`](./.prettierrc)
  - [`.prettierignore`](./.prettierignore)
- **Đọc kỹ thế nào**:
  - Cấu hình ESLint v9 dạng Flat Config (`export default [...]`), cách kết hợp rules giữa JS chuẩn và Prettier (`eslint-config-prettier`, `eslint-plugin-prettier`).
  - Phân biệt cờ cài đặt `-D` (`--save-dev`) cho công cụ phát triển.
- **Hiểu những gì**:
  - Linter bắt lỗi logic/cú pháp tiềm ẩn; Formatter định hình chuẩn style (dấu nháy, tab, chấm phẩy).
  - Tự động hóa sửa lỗi thông qua scripts `npm run lint:fix` và `npm run format`.
- **Checklist tự vấn**:
  1. *`-D` là gì và tại sao linter/formatter không nên đưa vào `dependencies` chính?*
  2. *Mục đích của file `.prettierignore` là gì? Những folder nào bắt buộc phải ignore?*

---

### BƯỚC 3: Cơ Sở Dữ Liệu & ORM (Neon Serverless PostgreSQL + Drizzle)
*(Đối chiếu dòng 33 - 53 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`drizzle.config.js`](./drizzle.config.js)
  - [`src/config/database.js`](./src/config/database.js)
  - [`src/models/user.model.js`](./src/models/user.model.js)
- **Đọc kỹ thế nào**:
  - Xem cách [`database.js`](./src/config/database.js) cấu hình kết nối linh hoạt: tự động nhận diện endpoint `neon-local:5432/sql` khi chạy container cục bộ hoặc endpoint cloud khi chạy production.
  - Xem định nghĩa bảng `users` trong [`user.model.js`](./src/models/user.model.js) với `pgTable`, `serial`, `varchar`, `timestamp`.
- **Hiểu những gì**:
  - **Drizzle Kit Workflow**: 
    - `npm run db:generate`: Dịch schema code JS/TS ra file SQL migration mẫu trong thư mục `drizzle/`.
    - `npm run db:migrate`: Thực thi apply các câu lệnh SQL migration vào database thực tế.
    - `npm run db:studio`: Giao diện trực quan xem/sửa data trực tiếp trên trình duyệt.
  - Tại sao luôn có `created_at` và `updated_at` trong Schema: Đảm bảo khả năng audit log, truy vết thời gian sửa đổi bản ghi.
- **Checklist tự vấn**:
  1. *Sự khác nhau bản chất giữa `db:generate` và `db:migrate` là gì?*
  2. *Tại sao dự án dùng `@neondatabase/serverless` kết hợp `drizzle-orm/neon-http` thay vì driver Postgres truyền thống (`pg`)?*
  3. *Tại sao schema trong code backend là "Single Source of Truth"?*

---

### BƯỚC 4: Quản Lý Subpath Imports, Logging & Global Middleware
*(Đối chiếu dòng 54 - 75 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`package.json`](./package.json) (mục `"imports"`)
  - [`src/config/logger.js`](./src/config/logger.js)
  - [`src/app.js`](./src/app.js)
- **Đọc kỹ thế nào**:
  - Xem khai báo `#config/*`, `#services/*`, `#routes/*` trong `package.json`.
  - Xem cách [`logger.js`](./src/config/logger.js) tạo Winston instance (ghi log ra Console có màu và ghi log vào file `logs/error.log`, `logs/combined.log`).
  - Xem cách [`app.js`](./src/app.js) gắn `morgan('combined')` bắn stream trực tiếp sang Winston `logger.info()`.
  - Xem thứ tự gắn: `helmet()`, `cors()`, `express.json()`, `express.urlencoded()`, `cookieParser()`.
- **Hiểu những gì**:
  - **Node.js Subpath Imports (`#*`)**: Tính năng native của Node.js giúp import đường dẫn tuyệt đối mà không cần babel hay module-alias bên ngoài, loại bỏ hoàn toàn `../../../../`.
  - **Security Headers & Monitoring**: `helmet` ngăn chặn clickjacking, XSS bằng HTTP headers; `morgan` + `winston` lưu trữ log có cấu trúc để audit production.
- **Checklist tự vấn**:
  1. *Subpath imports (`#config/...`) giải quyết vấn đề gì so với relative imports (`../../../`)?*
  2. *Tại sao phải pipe log của `morgan` sang `winston` thay vì dùng `console.log`?*
  3. *Middleware `helmet()` bảo vệ ứng dụng khỏi những nguy cơ cơ bản nào?*

---

### BƯỚC 5: Xác Thực (Authentication) & Chuẩn Hóa Dữ Liệu
*(Đối chiếu dòng 76 - 104 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`src/utils/jwt.js`](./src/utils/jwt.js)
  - [`src/utils/cookies.js`](./src/utils/cookies.js)
  - [`src/utils/format.js`](./src/utils/format.js)
  - [`src/validations/auth.validation.js`](./src/validations/auth.validation.js)
  - [`src/services/auth.service.js`](./src/services/auth.service.js)
  - [`src/controllers/auth.controller.js`](./src/controllers/auth.controller.js)
  - [`src/routes/auth.routes.js`](./src/routes/auth.routes.js)
- **Đọc kỹ thế nào**:
  - Lần theo luồng thực thi: `POST /api/auth/sign-up` hoặc `/sign-in`:
    1. `auth.validation.js`: Dùng `zod` validate format email (valid email), password (min length).
    2. `auth.controller.js`: Tiếp nhận request, gọi service, set HTTP-Only cookie thông qua `cookies.setAuthCookie()`.
    3. `auth.service.js`: Mã hóa mật khẩu bằng `bcrypt.hash()`, so khớp bằng `bcrypt.compare()`, truy vấn Drizzle DB, gọi `jwttoken.generate()`.
- **Hiểu những gì**:
  - **Kiến trúc 3 Tầng (Controller - Service - Model)**: Controller chỉ lo Request/Response HTTP; Service lo Business Logic và Database; Utilities lo helper chức năng.
  - Lưu trữ JWT trong `httpOnly cookie` giúp chống tấn công XSS (Javascript phía client không đọc được cookie).
- **Checklist tự vấn**:
  1. *Tại sao validation nên được tách thành middleware riêng bằng Zod trước khi tới controller?*
  2. *Tại sao không lưu plain password vào DB và salt rounds của bcrypt hoạt động thế nào?*
  3. *Tại sao lưu JWT vào `httpOnly` cookie an toàn hơn `localStorage`?*

---

### BƯỚC 6: Bảo Mật Chuyên Sâu với Arcjet (Bot Detection & Rate Limiting)
*(Đối chiếu dòng 105 - 116 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`src/config/arcjet.js`](./src/config/arcjet.js)
  - [`src/middleware/security.middleware.js`](./src/middleware/security.middleware.js)
- **Đọc kỹ thế nào**:
  - Xem cách [`arcjet.js`](./src/config/arcjet.js) bypass trong môi trường `NODE_ENV === 'test'`, và chỉ kích hoạt `detectBot` nghiêm ngặt trên môi trường `production`.
  - Xem [`security.middleware.js`](./src/middleware/security.middleware.js): Áp dụng **Sliding Window Rate Limiting** theo vai trò: `admin` (50 req/min), `user` (30 req/min), `guest` (20 req/min).
  - Bỏ qua kiểm tra bảo mật cho các public routes: `/`, `/health`, `/api`.
- **Hiểu những gì**:
  - **Defense in Depth**: Bảo vệ tầng ứng dụng chống tấn công DoS, brute force và web scraping bot mà không làm gián đoạn việc phát triển ở môi trường dev (cho phép Postman/cURL).
- **Checklist tự vấn**:
  1. *Sliding Window Rate Limit khác gì Fixed Window Rate Limit?*
  2. *Tại sao cần phân tầng giới hạn request theo Role (Admin / User / Guest)?*
  3. *Làm thế nào để Arcjet không làm fail unit/integration tests trong CI?*

---

### BƯỚC 7: Nghiệp Vụ Người Dùng & Phân Quyền RBAC (Role-Based Access Control)
*(Đối chiếu dòng 131 - 146 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`src/validations/users.validation.js`](./src/validations/users.validation.js)
  - [`src/middleware/auth.middleware.js`](./src/middleware/auth.middleware.js)
  - [`src/services/users.service.js`](./src/services/users.service.js)
  - [`src/controllers/users.controller.js`](./src/controllers/users.controller.js)
  - [`src/routes/users.routes.js`](./src/routes/users.routes.js)
- **Đọc kỹ thế nào**:
  - Xem 2 middleware: `authenticateToken` (giải mã cookie token, nạp thông tin user vào `req.user`) và `requireRole(['admin'])` (kiểm tra quyền truy cập).
  - Xem cách tổ chức CRUD trong [`users.routes.js`](./src/routes/users.routes.js): lấy danh sách, lấy chi tiết, cập nhật thông tin, xóa người dùng.
- **Hiểu những gì**:
  - **Lỗ hổng Privilege Escalation (Leo thang đặc quyền)**: Nếu API cho phép client truyền field `role="admin"` tự do khi Sign-Up hoặc Update, kẻ tấn công có thể chiếm quyền hệ thống. Cần có cơ chế kiểm tra đặc quyền nghiêm ngặt khi cấp phát role.
- **Checklist tự vấn**:
  1. *Thứ tự thực thi giữa `authenticateToken` và `requireRole` trong một route là gì?*
  2. *Làm thế nào để ngăn chặn một user thường tự sửa role của mình thành admin?*
  3. *Khi user gọi API Logout, token/cookie được xử lý và hủy bỏ ra sao?*

---

### BƯỚC 8: Container Hóa (Docker) & Quản Lý Môi Trường Dev/Prod
*(Đối chiếu dòng 117 - 130 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`Dockerfile`](./Dockerfile)
  - [`docker-compose.dev.yml`](./docker-compose.dev.yml)
  - [`docker-compose.prod.yml`](./docker-compose.prod.yml)
  - [`scripts/dev.sh`](./scripts/dev.sh)
  - [`scripts/prod.sh`](./scripts/prod.sh)
  - [`.env.development`](./.env.development), [`.env.production`](./.env.production)
- **Đọc kỹ thế nào**:
  - Xem [`Dockerfile`](./Dockerfile): Cấu trúc multi-stage build (tách stage `base`, `dependencies`, `runner`) giúp tối ưu kích thước image và tính bảo mật (chạy dưới non-root user `nodejs`).
  - Xem [`scripts/dev.sh`](./scripts/dev.sh): Khởi tạo thư mục `.neon_local`, chạy migration `npm run db:migrate`, đợi DB sẵn sàng rồi mới build compose dev.
- **Hiểu những gì**:
  - **Môi trường Dev vs Prod**:
    - **Dev**: Sử dụng Neon Local container để phát triển offline/nhanh chóng, mount volume mã nguồn để hot-reload.
    - **Prod**: Trỏ trực tiếp tới Neon Cloud PostgreSQL, image đóng gói độc lập, không mount source code.
- **Checklist tự vấn**:
  1. *Tại sao `scripts/dev.sh` phải chạy lệnh `npm run db:migrate` trước khi khởi động app container?*
  2. *Multi-stage build trong Dockerfile mang lại lợi ích gì so với single-stage build?*
  3. *Tại sao file `.env` chứa credentials thực tế không bao giờ được commit lên Git?*

---

### BƯỚC 9: Kiểm Thử Tự Động (Automated Testing với Jest & Supertest)
*(Đối chiếu dòng 147 - 170 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`jest.config.mjs`](./jest.config.mjs)
  - [`tests/app.test.js`](./tests/app.test.js)
  - [`package.json`](./package.json) (script `"test"`)
- **Đọc kỹ thế nào**:
  - Xem cờ `cross-env NODE_OPTIONS=--experimental-vm-modules jest` để Jest hỗ trợ chuẩn ES Modules.
  - Xem cách [`app.test.js`](./tests/app.test.js) sử dụng `request(app)` từ thư viện `supertest` để giả lập các HTTP request tới `/health`, `/api`, và route không tồn tại `/nonexistent` (kiểm tra 404 handler).
- **Hiểu những gì**:
  - Integration test giúp kiểm thử toàn bộ chu trình xử lý của Express App từ Middleware -> Router -> Response mà không cần khởi động HTTP server thực tế.
- **Checklist tự vấn**:
  1. *Tại sao cần cờ `--experimental-vm-modules` khi chạy Jest trong dự án ESM?*
  2. *Supertest gửi request vào `app` hay `server`? Tại sao?*
  3. *Làm thế nào để đo độ phủ code (test coverage) trong dự án này?*

---

### BƯỚC 10: Tự Động Hóa CI/CD với GitHub Actions
*(Đối chiếu dòng 171 - 184 trong `demo_raw_quickstart.md`)*

- **File cần đọc**:
  - [`.github/workflows/lint-and-format.yml`](./.github/workflows/lint-and-format.yml)
  - [`.github/workflows/tests.yml`](./.github/workflows/tests.yml)
  - [`.github/workflows/docker-build-and-push.yml`](./.github/workflows/docker-build-and-push.yml)
- **Đọc kỹ thế nào**:
  - Pipeline 3 giai đoạn:
    1. **Lint & Format**: Kiểm tra cú pháp và style trên mỗi Pull Request / Push.
    2. **Run Tests**: Cài đặt node, chạy `npm test`, xuất báo cáo coverage artifact.
    3. **Docker Build & Push**: Khi merge vào nhánh `main`, tự động build Docker image và đẩy lên Docker Hub.
  - Xem danh sách Secrets cần cấu hình trên GitHub: `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `TEST_DATABASE_URL`, `JWT_SECRET`.
- **Hiểu những gì**:
  - **Continuous Integration (CI)**: Đảm bảo code mới không làm hỏng code cũ thông qua tự động hóa linter và test.
  - **Continuous Deployment (CD)**: Đóng gói artifact (Docker container image) sẵn sàng triển khai lên Production.
- **Checklist tự vấn**:
  1. *Tại sao workflow `docker-build-and-push` chỉ nên kích hoạt khi code được push vào nhánh `main`?*
  2. *Nếu một test case bị fail trong workflow `tests.yml`, chuyện gì sẽ xảy ra với quá trình build/merge?*
  3. *Các GitHub Secrets được bảo mật và truyền vào môi trường chạy Actions như thế nào?*

---

## 🛠️ BLUEPRINT TỰ CODE LẠI DỰ ÁN TỪ SỐ 0

Để tự code lại toàn bộ dự án từ đầu mà không cần nhìn code mẫu, hãy thực hiện theo đúng 10 bước hành động sau:

```bash
# 1. Khởi tạo & Cấu hình Runtime
npm init -y
npm install express dotenv
# (Sửa package.json: "type": "module", "scripts": {"dev": "node --watch src/index.js"})
# (Tạo src/index.js -> src/server.js -> src/app.js)

# 2. Setup Linting & Formatting
npm install -D eslint @eslint/js prettier eslint-config-prettier eslint-plugin-prettier
# (Tạo eslint.config.js, .prettierrc, .prettierignore)

# 3. Setup Database & ORM
npm install @neondatabase/serverless drizzle-orm
npm install -D drizzle-kit
# (Tạo drizzle.config.js, src/config/database.js, src/models/user.model.js)
# (Chạy npm run db:generate && npm run db:migrate)

# 4. Setup Observability, Subpath Imports & Middlewares
npm install winston morgan helmet cors cookie-parser
# (Thêm "imports": { "#*": "./src/*" } vào package.json)
# (Tạo src/config/logger.js và cấu hình trong src/app.js)

# 5. Xây dựng Tính năng Authentication
npm install jsonwebtoken bcrypt zod
# (Tạo src/utils/jwt.js, cookies.js, format.js)
# (Tạo src/validations/auth.validation.js -> src/services/auth.service.js -> src/controllers/auth.controller.js -> src/routes/auth.routes.js)

# 6. Tích hợp Tường lửa Ứng dụng Arcjet
npm install @arcjet/node @arcjet/inspect
# (Tạo src/config/arcjet.js, src/middleware/security.middleware.js gắn vào src/app.js)

# 7. Xây dựng User CRUD & Phân quyền RBAC
# (Tạo src/middleware/auth.middleware.js với authenticateToken, requireRole)
# (Tạo users.validation.js -> users.service.js -> users.controller.js -> users.routes.js)

# 8. Dockerize & Shell Automation
# (Tạo Dockerfile multi-stage, docker-compose.dev.yml, docker-compose.prod.yml)
# (Tạo scripts/dev.sh, scripts/prod.sh)

# 9. Automated Testing
npm install -D jest supertest cross-env
# (Tạo jest.config.mjs, tests/app.test.js, cấu hình script "test")

# 10. CI/CD Pipelines
# (Tạo .github/workflows/lint-and-format.yml, tests.yml, docker-build-and-push.yml)
```

---
*Tài liệu được biên soạn đồng bộ trực tiếp từ tiến trình triển khai của [demo_raw_quickstart.md](./demo_raw_quickstart.md).*
