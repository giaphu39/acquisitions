# Warp - Prompt - Codebase Architect Explainer (Giải Thích Kiến Trúc Codebase)

Codebase Architect Explainer
Một AI prompt dùng để nghiên cứu bất kỳ codebase nào và đưa ra lời giải thích rõ ràng, có cấu trúc về kiến trúc cũng như cách thức hoạt động của hệ thống.

---

Bạn là một chuyên gia kiến trúc phần mềm (Software Architect) và lập trình viên cao cấp (Senior Developer). Nhiệm vụ của bạn là nghiên cứu sâu toàn bộ codebase được cung cấp, sau đó đưa ra lời giải thích rõ ràng, có cấu trúc về kiến trúc và cách thức hoạt động của hệ thống.

Khi phân tích codebase, hãy thực hiện theo các bước sau:

1. **Bức Tranh Tổng Thể (Identify the Big Picture)**
   - Đây là loại dự án gì (web app, API, CLI tool,...)?
   - Dự án này giải quyết bài toán/vấn đề gì?

2. **Kiến Trúc Cốt Lõi (Core Architecture)**
   - Giải thích cấu trúc ở mức tổng quan (monolith, microservices, layered architecture, event-driven,...).
   - Mô tả cách các phần chính của hệ thống được tổ chức (folders, modules, services).

3. **Các Thành Phần Quan Trọng (Key Components)**
   - Phân tích chi tiết từng component/module chính.
   - Giải thích mục đích của nó và cách nó kết nối, vận hành trong toàn bộ hệ thống.

4. **Luồng Dữ Liệu & Giao Tiếp (Data Flow & Communication)**
   - Dữ liệu di chuyển qua hệ thống như thế nào?
   - Những functions, APIs, hoặc services nào tương tác với nhau và tương tác bằng cách nào?

5. **Tech Stack & Dependencies**
   - Những frameworks, libraries, và databases nào đang được sử dụng?
   - Tại sao chúng lại quan trọng trong kiến trúc này?

6. **Luồng Thực Thi (Execution Flow)**
   - Đi qua một request hoặc workflow điển hình theo từng bước (ví dụ: "Người dùng bấm nút → API call → DB query → trả về response").

7. **Điểm Mạnh & Sự Đánh Đổi (Strengths & Tradeoffs)**
   - Những ưu điểm của thiết kế kiến trúc này là gì?
   - Có những hạn chế đáng chú ý nào hoặc điều gì cần lưu ý, cẩn trọng không?

8. **Tóm Tắt Cuối Cùng (Final Summary)**
   - Đưa ra một lời giải thích ngắn gọn, súc tích trong 2–3 câu để tôi có thể chia sẻ cho đồng đội hiểu nhanh toàn bộ hệ thống.

Hãy viết phần giải thích với giọng văn thân thiện nhưng chuyên nghiệp, chia thành các đề mục rõ ràng, sử dụng sơ đồ/ASCII flowchart nếu hữu ích, và đưa ra ví dụ về luồng request/response bất cứ khi nào có thể.

---

# Warp - Prompt - auth.service.js

Bạn là một backend developer đang phát triển ứng dụng Express.js với các tính năng authentication. Nhiệm vụ của bạn là mở rộng authentication service và controller để hỗ trợ tính năng đăng nhập (login) và đăng xuất (logout) của người dùng.

Trong file `auth.service.js`:

- Viết hàm `comparePassword` (tương tự như `hashPassword`) để kiểm tra xem mật khẩu người dùng cung cấp có khớp với mật khẩu đã băm (hashed password) lưu trong cơ sở dữ liệu hay không.
- Viết hàm `authenticateUser` nhận `email` và `password` làm đầu vào, kiểm tra xem người dùng có tồn tại trong database hay không, ném ra lỗi (throw error) nếu không tìm thấy, và kiểm tra tính hợp lệ của mật khẩu. Nếu mật khẩu chính xác, trả về thông tin user.

Trong file `auth.controller.js`:

- Thêm hàm `sign-in` để đăng nhập người dùng. Đảm bảo việc ghi log (logging) và xử lý lỗi (error handling) đồng nhất với hàm `signup` hiện có.
- Thêm hàm `sign-out` để đăng xuất người dùng. Tương tự, tuân thủ cùng quy chuẩn logging và error handling như `signup`.

---

# Warp - Prompt - Dockerization Prompt (Đóng Gói Docker)

Bạn là một Senior DevOps Engineer. Nhiệm vụ của bạn là dockerize ứng dụng của tôi đang sử dụng Neon Database. Cấu hình thiết lập phải hoạt động khác nhau giữa môi trường phát triển (development) và môi trường vận hành (production):

1. **Môi Trường Phát Triển - Development Environment (Local):**
   - Sử dụng **Neon Local** thông qua Docker.
   - Cấu hình `docker-compose.yml` để chạy Neon Local proxy song song với ứng dụng. Tìm hiểu thêm về Neon Local tại: https://neon.com/docs/local/neon-local
   - Ứng dụng sẽ kết nối tới Postgres qua file `.env`, ví dụ: `postgres://user:password@neon-local:5432/dbname` (hoặc tương đương `localhost` bên trong compose network).
   - Neon Local cần tự động tạo các nhánh tạm thời (ephemeral branches) phục vụ cho dev và testing.
   - Đảm bảo `.env.development` hoặc file config tương đương trỏ đúng vào chuỗi kết nối Neon Local này.

2. **Môi Trường Vận Hành - Production Environment:**
   - Sử dụng chuỗi kết nối thật **Neon Cloud Database URL** (ví dụ: `DATABASE_URL=postgres://...neon.tech...`).
   - Không sử dụng Neon Local proxy trong môi trường production.
   - Đảm bảo các secrets và URLs được truyền vào qua biến môi trường (environment variables), không hardcode trực tiếp vào mã nguồn.
   - Tạo riêng file `.env.production` cho các môi trường production.

3. **Yêu Cầu Chung:**
   - Viết file `Dockerfile` cho ứng dụng.
   - Viết file `docker-compose.dev.yml` để chạy cả ứng dụng và Neon Local phục vụ môi trường development.
   - Viết file `docker-compose.prod.yml` để chạy ứng dụng kết nối với serverless neondb phục vụ môi trường production.
   - Hướng dẫn rõ cách chuyển đổi biến môi trường (`DATABASE_URL`) giữa dev và prod.
   - Cung cấp tài liệu hướng dẫn (theo phong cách `README.md`) chỉ rõ cách một lập trình viên khởi động ứng dụng ở local với Neon Local, và cách triển khai chính ứng dụng đó với Neon DB Production.

---

# Warp - Prompt - User CRUD

Bạn là một backend developer đang phát triển ứng dụng Express.js với các tính năng User CRUD. Nhiệm vụ của bạn là mở rộng User service và controller để hoàn thiện toàn bộ các thao tác CRUD cho User.

Trong file `users.service.js`:

- Viết hàm `getUserById` (tương tự như `getAllUsers`) để lấy thông tin một người dùng dựa theo `id` được cung cấp.
- Viết hàm `updateUser` nhận `id` và `updates` làm đầu vào, kiểm tra xem người dùng có tồn tại trong database hay không, ném ra lỗi nếu không tìm thấy, và cập nhật thông tin của họ theo yêu cầu.
- Viết hàm `deleteUser` nhận `id` làm đầu vào và xóa người dùng đó khỏi database.

Trong file `users.validation.js`:

- Viết Zod schema `updateUserSchema` để validate các request gửi lên route cập nhật thông tin user.
- Viết Zod schema `userIdSchema` để validate xem request có chứa `id` đúng định dạng hay không.

Trong file `users.controller.js`:

- Thêm hàm `getUserById` để validate request, xử lý lỗi phù hợp, gọi service tương ứng, và đảm bảo ghi log đầy đủ. Hàm này cần đồng nhất với hàm `getAllUsers` hiện có.
- Thêm hàm `updateUser` để validate request, xử lý lỗi, chỉ cho phép người dùng đã đăng nhập thay đổi thông tin của chính mình, chỉ cho phép người dùng có role là "admin" được quyền thay đổi "role" của bất kỳ ai, gọi service tương ứng, và đảm bảo ghi log đầy đủ.
- Thêm hàm `deleteUser` để validate request, thực hiện tất cả các bước kiểm tra cần thiết, gọi service tương ứng, và đảm bảo ghi log đầy đủ.

---

# Warp - Prompt - CI/CD Pipeline

Bạn là một backend developer đang làm việc trong dự án cần triển khai các CI/CD pipeline. Nhiệm vụ của bạn là nghiên cứu codebase và tạo 3 GitHub Actions workflows.

Trong file **lint-and-format.yml**:

- Xây dựng workflow kích hoạt khi có sự kiện push và pull request vào các nhánh `main` và `staging`.
- Sử dụng Node.js phiên bản `20.x` có bật tính năng caching.
- Cài đặt dependencies bằng lệnh `npm ci`.
- Chạy kiểm tra ESLint với `npm run lint` và kiểm tra định dạng Prettier với `npm run format:check`.
- Đánh dấu workflow thất bại (fail) nếu phát hiện lỗi, đồng thời đưa ra annotations gợi ý lệnh sửa lỗi bằng `npm run lint:fix` và `npm run format`.

Trong file **tests.yml**:

- Xây dựng workflow kích hoạt khi có sự kiện push và pull request vào các nhánh `main` và `staging`.
- Sử dụng Node.js phiên bản `20.x` có bật tính năng caching.
- Cài đặt dependencies bằng lệnh `npm ci`.
- Chạy kiểm thử tự động với `npm test`, đảm bảo các biến môi trường như `NODE_ENV=test`, `NODE_OPTIONS=--experimental-vm-modules`, và `DATABASE_URL` được thiết lập đầy đủ.
- Tải lên (upload) báo cáo độ phủ mã nguồn (coverage reports) dưới dạng artifacts và lưu giữ trong 30 ngày.
- Tạo bảng tóm tắt GitHub step summary hiển thị kết quả kiểm thử hoặc trạng thái coverage.
- Thêm annotations thông báo chi tiết khi có bài test nào bị fail.

Trong file **docker-build-and-push.yml**:

- Xây dựng workflow kích hoạt khi có sự kiện push vào nhánh `main` hoặc kích hoạt thủ công qua `workflow_dispatch`.
- Cấu hình Docker Buildx để hỗ trợ build đa nền tảng (multi-platform builds).
- Đăng nhập vào Docker Hub sử dụng secrets (`DOCKER_USERNAME`, `DOCKER_PASSWORD`).
- Sử dụng action `docker/metadata-action` để trích xuất tags và labels, bao gồm tên branch, commit SHA, `latest`, và định dạng timestamp `prod-YYYYMMDD-HHmmss`.
- Đóng gói (build) và đẩy (push) production image bằng action `docker/build-push-action`, nhắm tới các kiến trúc `linux/amd64` và `linux/arm64`, sử dụng cache để tối ưu hiệu năng.
- Đính kèm GitHub summary chứa tên image và danh sách tags vừa được publish.
