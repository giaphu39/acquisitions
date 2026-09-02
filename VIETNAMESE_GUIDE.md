# 📖 HƯỚNG DẪN CÀI ĐẶT VÀ VẬN HÀNH DỰ ÁN (VIETNAMESE GUIDE)

_Dự án: **Acquisitions Backend API** (Node.js Express + Drizzle ORM + Neon Postgres + Arcjet Security + Docker)_

---

## 📌 MỤC LỤC

1. [Giới Thiệu Tổng Quan](#1-giới-thiệu-tổng-quan)
2. [Yêu Cầu Môi Trường (Prerequisites)](#2-yêu-cầu-môi-trường-prerequisites)
3. [Cấu Hình Biến Môi Trường (.env.\*)](#3-cấu-hình-biến-môi-trường-env)
4. [Các Cách Khởi Chạy Dự Án](#4-các-cách-khởi-chạy-dự-án)
   - [Cách 1: Chạy trực tiếp trên máy Host (Local Node.js)](#cách-1-chạy-trực-tiếp-trên-máy-host-local-nodejs)
   - [Cách 2: Chạy môi trường Dev với Docker Compose & Neon Local](#cách-2-chạy-môi-trường-dev-với-docker-compose--neon-local)
   - [Cách 3: Chạy môi trường Production với Docker Compose](#cách-3-chạy-môi-trường-production-với-docker-compose)
5. [Quản Trị Cơ Sở Dữ Liệu Với Drizzle ORM](#5-quản-trị-cơ-sở-dữ-liệu-với-drizzle-orm)
6. [Hướng Dẫn Kiểm Thử API & Phân Quyền (RBAC Testing)](#6-hướng-dẫn-kiểm-thử-api--phân-quyền-rbac-testing)
7. [Chạy Kiểm Thử Tự Động (Testing) & Kiểm Tra Code (Lint/Format)](#7-chạy-kiểm-thử-tự-động-testing--kiểm-tra-code-lintformat)
8. [Cấu Hình CI/CD GitHub Actions & Docker Hub](#8-cấu-hình-cicd-github-actions--docker-hub)
9. [Bảng Tra Cứu & Xử Lý Lỗi Thường Gặp (Troubleshooting)](#9-bảng-tra-cứu--xử-lý-lỗi-thường-gặp-troubleshooting)

---

## 🚀 1. Giới Thiệu Tổng Quan

**Acquisitions Backend API** là dự án xây dựng dịch vụ RESTful API hoàn chỉnh theo tiêu chuẩn hiện đại:

- **Runtime & Framework**: Node.js 18+ (ES Modules `import/export`), Express.js 5.
- **Database & ORM**: PostgreSQL (trên nền tảng Cloud Serverless Neon) kết hợp với Drizzle ORM.
- **Bảo mật & Giám sát**:
  - **Arcjet**: Bảo vệ Shield (chống SQLi, XSS), nhận diện Bot độc hại, giới hạn tần suất gọi API (Sliding Window Rate Limiting).
  - **Helmet & CORS**: Thiết lập HTTP Security Headers và cấu hình chia sẻ tài nguyên.
  - **Winston & Morgan**: Hệ thống ghi nhật ký (Logging) tập trung vào Console và file log.
  - **JWT & Cookie HttpOnly**: Xác thực an toàn, chống tấn công XSS.
- **Containerization & CI/CD**: Docker Multi-stage build, Docker Compose (hỗ trợ Neon Local Proxy), GitHub Actions tự động kiểm thử và đẩy Docker Image lên Docker Hub.

---

## 💻 2. Yêu Cầu Môi Trường (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:

1. **Node.js**: Phiên bản `>= 18.x` hoặc `>= 20.x` ([Tải tại nodejs.org](https://nodejs.org/)).
2. **npm**: Đi kèm với Node.js.
3. **Docker Desktop**: Bắt buộc nếu muốn chạy bằng Docker hoặc Neon Local ([Tải tại docker.com](https://www.docker.com/products/docker-desktop/)).
4. **Git**: Dùng để quản lý mã nguồn.
5. **HTTP Client (Tùy chọn)**: [HTTPie CLI](https://httpie.io/cli), [Postman](https://www.postman.com/), hoặc extension **Thunder Client** / **REST Client** trên VS Code.

---

## ⚙️ 3. Cấu Hình Biến Môi Trường (.env.\*)

Dự án sử dụng các file cấu hình môi trường khác nhau tùy theo ngữ cảnh chạy:

| Tên File               | Ngữ cảnh sử dụng                                               | Cơ sở dữ liệu kết nối                          |
| :--------------------- | :------------------------------------------------------------- | :--------------------------------------------- |
| **`.env`**             | Chạy trực tiếp Node.js ở máy host hoặc lệnh migration          | Neon Cloud Database URL                        |
| **`.env.development`** | Chạy Dev với Docker Compose (`docker-compose.dev.yml`)         | Neon Local Proxy Container (`neon-local:5432`) |
| **`.env.production`**  | Chạy Production với Docker Compose (`docker-compose.prod.yml`) | Neon Cloud Database URL (Production)           |

### 3.1. Hướng dẫn lấy các thông số kết nối

1. **Tạo tài khoản Neon Database**:
   - Truy cập [https://console.neon.tech/](https://console.neon.tech/) -> Tạo Project mới.
   - Sao chép chuỗi **Connection String** (ví dụ: `postgresql://neondb_owner:npg_xxx@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`).
   - Vào **Account Settings** -> **API Keys** -> Tạo `NEON_API_KEY`.
   - Vào **Project Settings** -> Sao chép `NEON_PROJECT_ID`.
2. **Tạo tài khoản Arcjet Security**:
   - Truy cập [https://arcjet.com/](https://arcjet.com/) -> Đăng ký và tạo Site mới.
   - Chọn SDK là **Node.js** -> Sao chép `ARCJET_KEY` (dạng `ajkey_...`).

---

### 3.2. Nội dung mẫu các file cấu hình

#### 📄 File `.env` (Dành cho chạy Local máy Host)

Tạo file `.env` tại thư mục gốc của dự án:

```env
# Cổng chạy ứng dụng
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

# Chuỗi kết nối Database Postgres trên Neon Cloud
DATABASE_URL=postgresql://username:password@ep-sample-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Khóa JWT dùng để mã hóa token
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Khóa bảo mật Arcjet
ARCJET_KEY=ajkey_your_actual_arcjet_api_key_here
ARCJET_ENV=development
```

#### 📄 File `.env.development` (Dành cho Docker Dev + Neon Local)

Tạo file `.env.development` tại thư mục gốc:

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug

# Chuỗi kết nối Postgres khi chạy trong Docker Dev qua Neon Local proxy
DATABASE_URL=postgresql://neon:npg@neon-local:5432/neondb

# Cấu hình Neon Local Proxy để đồng bộ schema với Cloud
NEON_API_KEY=your_actual_neon_api_key_here
NEON_PROJECT_ID=your_actual_neon_project_id_here
PARENT_BRANCH_ID=main

# Khóa JWT & Arcjet
JWT_SECRET=dev-jwt-secret-key-123456789
ARCJET_KEY=ajkey_your_actual_arcjet_api_key_here
ARCJET_ENV=development
```

#### 📄 File `.env.production` (Dành cho Docker Production)

Tạo file `.env.production` tại thư mục gốc:

```env
PORT=3000
NODE_ENV=production
LOG_LEVEL=info

# Chuỗi kết nối Production Database thật trên Neon Cloud
DATABASE_URL=postgresql://username:password@ep-sample-production.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Khóa bí mật an toàn cho Production
JWT_SECRET=production_super_strong_secret_key_change_me_in_prod
ARCJET_KEY=ajkey_your_production_arcjet_key_here
ARCJET_ENV=production
```

---

## 🏃 4. Các Cách Khởi Chạy Dự Án

### Cách 1: Chạy trực tiếp trên máy Host (Local Node.js)

_Phù hợp cho việc code nhanh, debug trực tiếp bằng VS Code._

**Bước 1: Cài đặt thư viện**

```bash
npm install
```

**Bước 2: Đồng bộ Schema vào Cơ Sở Dữ Liệu (Neon Cloud)**

```bash
# Tạo file migration từ schema models
npm run db:generate

# Áp dụng migration vào cơ sở dữ liệu thật
npm run db:migrate
```

**Bước 3: Khởi động Server ở chế độ Watch (Hot-reload)**

```bash
npm run dev
```

- Server sẽ khởi chạy tại: `http://localhost:3000`
- Mỗi khi bạn sửa code và lưu file (`Ctrl + S`), Node.js sẽ tự động cập nhật ngay lập tức.

---

### Cách 2: Chạy môi trường Dev với Docker Compose & Neon Local

_Cách này sử dụng Docker container cho ứng dụng Express và một container proxy `neon-local` tạo database nhánh ảo (ephemeral branch)._

> [!IMPORTANT]
> Hãy chắc chắn rằng **Docker Desktop** đang bật trước khi chạy các lệnh sau.

**Trên Windows (PowerShell / CMD):**

```powershell
# Tạo thư mục lưu metadata của neon-local
mkdir -Force .neon_local

# Chạy Docker Compose môi trường dev
docker compose -f docker-compose.dev.yml up --build
```

**Trên Linux / macOS / Git Bash:**

```bash
npm run dev:docker
# Hoặc chạy trực tiếp:
sh ./scripts/dev.sh
```

**Đặc điểm của môi trường Docker Dev:**

- Ứng dụng tự động gắn Volume (`.:/app`) nên khi bạn sửa code ở máy host, container sẽ tự động reload.
- Database chạy qua proxy `neon-local` tại cổng `5432`.
- Ứng dụng truy cập tại: `http://localhost:3000`.

**Dừng môi trường Docker Dev:**

```bash
docker compose -f docker-compose.dev.yml down
```

---

### Cách 3: Chạy môi trường Production với Docker Compose

_Đóng gói ứng dụng tối ưu, chạy bằng tài khoản non-root (`nodejs`), sử dụng Neon Cloud Database thật và giới hạn tài nguyên CPU/RAM._

**Trên Windows (PowerShell / CMD):**

```powershell
docker compose -f docker-compose.prod.yml up --build -d
```

**Trên Linux / macOS / Git Bash:**

```bash
npm run prod:docker
# Hoặc chạy trực tiếp:
sh ./scripts/prod.sh
```

**Xem log và kiểm tra trạng thái:**

```bash
# Xem log ứng dụng đang chạy nền
docker logs -f acquisitions-app-prod

# Kiểm tra trạng thái container (Health status)
docker ps
```

**Dừng môi trường Production:**

```bash
docker compose -f docker-compose.prod.yml down
```

---

## 🗄️ 5. Quản Trị Cơ Sở Dữ Liệu Với Drizzle ORM

Drizzle ORM cung cấp các lệnh cực kỳ mạnh mẽ để quản trị CSDL:

```bash
# 1. Sinh file SQL migration mới mỗi khi bạn thay đổi file trong src/models/
npm run db:generate

# 2. Thực thi file SQL migration vào Database được chỉ định trong DATABASE_URL
npm run db:migrate

# 3. Mở giao diện Web trực quan (Drizzle Studio) để xem/sửa dữ liệu bảng
npm run db:studio
```

Sau khi chạy `npm run db:studio`, trình duyệt sẽ mở giao diện quản trị tại: `https://local.drizzle.studio` hoặc `http://localhost:4983`.

---

## 🧪 6. Hướng Dẫn Kiểm Thử API & Phân Quyền (RBAC Testing)

Dưới đây là bảng tổng hợp danh sách các API và quyền hạn tương ứng:

| Method   | Endpoint             | Quyền hạn truy cập        | Mô tả                                           |
| :------- | :------------------- | :------------------------ | :---------------------------------------------- |
| `GET`    | `/health`            | Public (Ai cũng gọi được) | Kiểm tra server có đang hoạt động tốt hay không |
| `GET`    | `/api`               | Public                    | Thông tin chào mừng của API                     |
| `POST`   | `/api/auth/signup`   | Public                    | Đăng ký tài khoản người dùng mới                |
| `POST`   | `/api/auth/sign-in`  | Public                    | Đăng nhập và nhận Cookie JWT Token              |
| `POST`   | `/api/auth/sign-out` | Public                    | Đăng xuất và xóa Cookie Token                   |
| `GET`    | `/api/users`         | **Admin Only**            | Lấy danh sách toàn bộ người dùng trong hệ thống |
| `GET`    | `/api/users/:id`     | **Authenticated User**    | Lấy thông tin chi tiết của một người dùng       |
| `PUT`    | `/api/users/:id`     | **Owner hoặc Admin**      | Cập nhật thông tin người dùng                   |
| `DELETE` | `/api/users/:id`     | **Admin Only**            | Xóa tài khoản người dùng khỏi hệ thống          |

---

### 📋 Kịch bản kiểm thử từng bước bằng HTTPie & Postman

#### Bước 1: Kiểm tra trạng thái hệ thống (Health Check)

```bash
http GET http://localhost:3000/health
```

_Kết quả trả về (`200 OK`):_

```json
{
  "status": "OK",
  "timestamp": "2026-09-02T05:30:00.000Z",
  "uptime": 12.45
}
```

---

#### Bước 2: Đăng ký tài khoản User thông thường

```bash
http POST http://localhost:3000/api/auth/signup \
  name="Nguyen Van A" \
  email="userA@example.com" \
  password="password123" \
  role="user"
```

_Kết quả trả về (`201 Created`):_

```json
{
  "message": "User registered",
  "user": {
    "id": 1,
    "name": "Nguyen Van A",
    "email": "userA@example.com",
    "role": "user"
  }
}
```

_(Đồng thời Header trả về `Set-Cookie: token=eyJhbGci...; HttpOnly`)_

---

#### Bước 3: Đăng ký tài khoản Quản trị viên (Admin)

```bash
http POST http://localhost:3000/api/auth/signup \
  name="Admin Boss" \
  email="admin@example.com" \
  password="adminPassword123" \
  role="admin"
```

---

#### Bước 4: Kiểm thử Phân quyền (RBAC) với Cookie

**1. Đăng nhập với tài khoản User thường và lưu Cookie vào Session của HTTPie:**

```bash
# Đăng nhập và lưu cookie vào session 'user_session'
http --session=user_session POST http://localhost:3000/api/auth/sign-in \
  email="userA@example.com" \
  password="password123"
```

**2. Thử dùng quyền User thường để lấy toàn bộ danh sách Users (Yêu cầu quyền Admin):**

```bash
http --session=user_session GET http://localhost:3000/api/users
```

_Kết quả nhận được: **`403 Forbidden`** (Bị chặn do không đủ quyền)_

```json
{
  "error": "Access denied",
  "message": "Insufficient permissions"
}
```

**3. Đăng nhập với tài khoản Admin và lấy danh sách:**

```bash
# Đăng nhập tài khoản Admin vào session 'admin_session'
http --session=admin_session POST http://localhost:3000/api/auth/sign-in \
  email="admin@example.com" \
  password="adminPassword123"

# Gọi API lấy toàn bộ danh sách users với quyền Admin
http --session=admin_session GET http://localhost:3000/api/users
```

_Kết quả nhận được: **`200 OK`** (Trả về mảng danh sách người dùng đầy đủ)_

---

#### Bước 5: Đăng xuất hệ thống

```bash
http --session=admin_session POST http://localhost:3000/api/auth/sign-out
```

_Header trả về sẽ xóa Cookie `token` (`Max-Age=0`)._

---

## 🧪 7. Chạy Kiểm Thử Tự Động (Testing) & Kiểm Tra Code (Lint/Format)

### 7.1. Chạy Unit & Integration Tests với Jest

Dự án sử dụng Jest kết hợp Supertest để tự động kiểm thử các endpoint:

```bash
npm test
```

_Lệnh này chạy Jest với cờ `--experimental-vm-modules` để tương thích hoàn toàn với ES Modules._

### 7.2. Kiểm tra chuẩn viết code (ESLint)

```bash
# Kiểm tra lỗi cú pháp và cảnh báo
npm run lint

# Tự động sửa các lỗi cú pháp cơ bản
npm run lint:fix
```

### 7.3. Định dạng code tự động (Prettier)

```bash
# Kiểm tra xem có file nào chưa đúng chuẩn format không
npm run format:check

# Tự động format lại toàn bộ file trong dự án
npm run format
```

---

## 🚢 8. Cấu Hình CI/CD GitHub Actions & Docker Hub

Khi bạn đẩy code lên repository GitHub, luồng CI/CD tự động trong thư mục `.github/workflows/` sẽ chạy:

1. **`lint-and-format.yml`**: Kiểm tra quy chuẩn code với ESLint & Prettier.
2. **`tests.yml`**: Khởi chạy bộ test Jest tự động.
3. **`docker-build-and-push.yml`**: Tự động build Docker Image và đẩy lên **Docker Hub**.

### Các Secrets cần thêm trên GitHub:

Vào GitHub Repo -> **Settings** -> **Secrets and variables** -> **Actions** -> Nhấn **New repository secret**:

| Tên Secret              | Ý nghĩa & Giá trị                                                          |
| :---------------------- | :------------------------------------------------------------------------- |
| **`DOCKER_USERNAME`**   | Tên đăng nhập tài khoản Docker Hub của bạn                                 |
| **`DOCKER_PASSWORD`**   | **Personal Access Token (PAT)** tạo từ Docker Hub với quyền `Read & Write` |
| **`TEST_DATABASE_URL`** | Chuỗi kết nối Database Postgres dùng riêng cho môi trường chạy Test CI     |
| **`NODE_ENV`**          | Đặt giá trị là `production`                                                |

> [!TIP]
> **Cách lấy Docker PAT (Personal Access Token):**
>
> 1. Đăng nhập [hub.docker.com](https://hub.docker.com/).
> 2. Nhấn vào Avatar góc phải -> **Account Settings** -> **Personal access tokens**.
> 3. Chọn **Generate new token** -> Đặt tên token và cấp quyền **Read & Write (Access Permissions)** -> Nhấn **Generate** và copy chuỗi token lưu vào `DOCKER_PASSWORD`.

---

## 🛠️ 9. Bảng Tra Cứu & Xử Lý Lỗi Thường Gặp (Troubleshooting)

### ❌ Lỗi 1: `ECONNREFUSED` hoặc không thể kết nối tới Database

- **Nguyên nhân**: File `.env` chưa có `DATABASE_URL` hoặc chuỗi kết nối bị sai tài khoản/mật khẩu, hoặc dự án Neon trên Cloud bị tạm dừng (Paused/Suspended).
- **Khắc phục**:
  1. Kiểm tra lại chuỗi `DATABASE_URL` trong file `.env`.
  2. Truy cập Neon Console để đánh thức Database hoặc lấy lại chuỗi kết nối có kèm tham số `?sslmode=require`.

### ❌ Lỗi 2: `Port 3000` hoặc `Port 5432` đã bị chiếm dụng (Address already in use)

- **Nguyên nhân**: Đang có một tiến trình Node.js hoặc một PostgreSQL cục bộ chạy ngầm chiếm cổng mạng.
- **Khắc phục**:
  - _Trên Windows (PowerShell)_:
    ```powershell
    # Tìm tiến trình đang chiếm cổng 3000
    Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
    ```
  - _Hoặc đổi PORT trong file `.env` thành `3001` hoặc `8080`._

### ❌ Lỗi 3: Lỗi `403 Forbidden` liên tục khi gọi API (Arcjet chặn)

- **Nguyên nhân**: Bạn gửi quá nhiều request trong thời gian ngắn (vượt giới hạn Rate Limit của Arcjet) hoặc Arcjet nhận diện client gửi request là Bot tự động.
- **Khắc phục**:
  - Tạm đợi 1 - 2 phút để cửa sổ trượt (sliding window) của Arcjet reset.
  - Thêm tiêu đề `User-Agent` hợp lệ khi gửi request bằng HTTP client.
  - Nếu kiểm thử nội bộ, kiểm tra lại `ARCJET_KEY` hoặc điều chỉnh ngưỡng `max` trong `src/middleware/security.middleware.js`.

### ❌ Lỗi 4: Lỗi dòng kết thúc `\r` (CRLF) khi chạy script `.sh` trên Docker Windows

- **Nguyên nhân**: Windows sử dụng ký tự xuống dòng `CRLF` (`\r\n`), trong khi môi trường Linux Container yêu cầu `LF` (`\n`).
- **Khắc phục**:
  - Chuyển đổi định dạng file `scripts/dev.sh` và `scripts/prod.sh` sang `LF` trên VS Code (nhìn ở góc dưới cùng bên phải thanh trạng thái của VS Code, nhấp vào `CRLF` và đổi thành `LF`).

---

🎉 **Chúc bạn phát triển và triển khai dự án Acquisitions Backend thành công!**
