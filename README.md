<div align="center">
  <br />
  <a href="https://youtu.be/H5FAxTBuNM8" target="_blank">
    <img src="public/readme/hero.webp" alt="Project Banner">
  </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Neon%20Postgres-2496ED?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Drizzle%20ORM-FFDF00?style=for-the-badge&logo=drizzle&logoColor=black"/>
    <img src="https://img.shields.io/badge/-Arcjet%20Security-000000?style=for-the-badge&logo=shield&logoColor=white"/>
  </div>

  <h2 align="center">Hệ Thống Acquisitions API Chuẩn Production & DevOps</h2>

  <p align="center">
    Dự án xây dựng Backend RESTful API hoàn chỉnh với Node.js, Express, Neon Postgres, Drizzle ORM, Arcjet Security, Jest Testing, Docker Containerization và GitHub Actions CI/CD.
  </p>

  <p align="center">
    🔗 <b>Repository gốc</b>: <a href="https://github.com/adrianhajdin/acquisitions" target="_blank"><b>adrianhajdin/acquisitions</b></a> &nbsp;|&nbsp;
    🎥 <b>Video Tutorial gốc</b>: <a href="https://www.youtube.com/watch?v=XUkNR-JfHwo" target="_blank"><b>JavaScript Mastery YouTube</b></a> &nbsp;|&nbsp;
    📄 <b>README gốc (Tiếng Anh)</b>: <a href="./README_ROOT_EN.md"><b>README_ROOT_EN.md</b></a>
  </p>
</div>

---

## 📚 HỆ THỐNG TÀI LIỆU DỰ ÁN (DOCUMENTATION HUB)

Để nhanh chóng nắm bắt và làm chủ toàn bộ dự án, hãy tham khảo các tài liệu chuyên biệt dưới đây:

| Tài liệu | Ý nghĩa & Nội dung chính nắm giữ |
| :--- | :--- |
| [**`README_ROOT_EN.md`**](./README_ROOT_EN.md) | **Original English README**: Bản lưu trữ tài liệu README gốc bằng tiếng Anh từ repository chính thức [adrianhajdin/acquisitions](https://github.com/adrianhajdin/acquisitions). |
| [**`READ_PROJECT.md`**](./READ_PROJECT.md) | **Lộ trình đọc hiểu toàn diện**: Hướng dẫn 10 bước đọc code đối chiếu với video gốc, các câu hỏi tự vấn kiểm tra mức độ hiểu và Blueprint từng lệnh để tự code lại từ số 0. |
| [**`VIETNAMESE_GUIDE.md`**](./VIETNAMESE_GUIDE.md) | **Hướng dẫn khởi chạy nhanh**: Cách chạy dự án qua 3 chế độ (Node Host, Docker Compose Dev với Neon Local, Docker Prod), quản trị DB Drizzle và xử lý sự cố. |
| [**`POSTMAN_GUIDE.md`**](./POSTMAN_GUIDE.md) | **Hướng dẫn kiểm thử Postman**: Chi tiết cách test 9 API, cơ chế HttpOnly Cookie tự động (không cần copy token), kịch bản test phân quyền RBAC và mã JSON Collection import nhanh. |
| [**`Learning_Demo.md`**](./Learning_Demo.md) | **Kiến thức chuyên sâu & FAQ**: Giải đáp chi tiết 13 câu hỏi kỹ thuật, sơ đồ cấu trúc thư mục phân tầng, phân tích bảo mật Arcjet và phòng chống lỗ hổng Privilege Escalation. |
| [**`demo_raw_quickstart.md`**](./demo_raw_quickstart.md) | **Ghi chú tiến trình thô**: Ghi lại từng bước gõ lệnh/viết code tuần tự từ video gốc cùng những thắc mắc, câu hỏi phát sinh trong quá trình học. |
| [**`DOCKER_SETUP.md`**](./DOCKER_SETUP.md) | **Hướng dẫn Docker chi tiết**: Hướng dẫn cấu hình Docker Compose, multi-stage build và cơ chế hoạt động của Neon Local proxy. |

---

## ⚙️ CÔNG NGHỆ CỐT LÕI (TECH STACK)

- **[Node.js](https://nodejs.org/) (v20+ ESM)**: Runtime JavaScript hiện đại với chuẩn Native ES Modules và cờ `--watch` tích hợp sẵn.
- **[Express.js](https://expressjs.com/) (v5)**: Web Framework xử lý định tuyến (routing), middleware và RESTful APIs.
- **[Neon Serverless Postgres](https://neon.tech/)**: Cơ sở dữ liệu PostgreSQL trên Cloud với khả năng autoscaling và hỗ trợ Neon Local cho môi trường Dev offline.
- **[Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit**: ORM tối ưu hiệu năng, an toàn kiểu dữ liệu (type-safe), tự động sinh và thực thi migration SQL.
- **[Arcjet Security](https://arcjet.com/)**: Lớp bảo vệ chuyên sâu với Web Application Shield (chống SQLi, XSS), Bot Detection và Sliding Window Rate Limiting theo Role.
- **[Zod](https://zod.dev/)**: Thư viện xác thực Schema dữ liệu đầu vào (Input Validation).
- **[Bcrypt](https://www.npmjs.com/package/bcrypt) & [JWT](https://jwt.io/)**: Mã hóa mật khẩu an toàn và xác thực người dùng qua HttpOnly Cookies.
- **[Winston](https://github.com/winstonjs/winston) & [Morgan](https://github.com/expressjs/morgan)**: Hệ thống ghi log có cấu trúc và giám sát luồng traffic HTTP.
- **[Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest)**: Bộ công cụ kiểm thử tích hợp (Integration Testing) tự động cho toàn bộ endpoints.
- **[Docker](https://www.docker.com/) & Docker Compose**: Container hóa ứng dụng với Multi-stage build và cấu hình tách biệt Dev / Prod.
- **[GitHub Actions](https://github.com/features/actions)**: Tự động hóa quy trình CI/CD: Linting ➔ Testing & Coverage ➔ Docker Hub Image Publishing.

---

## 🔋 TÍNH NĂNG NỔI BẬT (FEATURES)

- 👉 **Native Subpath Imports**: Sử dụng bí danh đường dẫn sạch sẽ dạng `#config/*`, `#services/*`, `#routes/*` thay vì `../../..`.
- 👉 **Stateless JWT via HttpOnly Cookies**: Xác thực bảo mật, chống tấn công XSS và đánh cắp token từ trình duyệt.
- 👉 **Role-Based Access Control (RBAC)**: Phân quyền chặt chẽ giữa `admin` và `user` thông qua middleware `authenticateToken` và `requireRole`.
- 👉 **Multi-Tier App Defense**: Tích hợp Arcjet chặn bot xấu, giới hạn tần suất request (Guest: 20 req/m, User: 30 req/m, Admin: 50 req/m).
- 👉 **Dual Environment Strategy**:
  - *Dev Mode*: Kết nối qua Neon Local proxy, tự động hot-reload bằng `node --watch`.
  - *Prod Mode*: Kết nối trực tiếp Neon Cloud PostgreSQL qua HTTPS/TLS, image Docker nhẹ và chạy non-root user.
- 👉 **Automated CI/CD Pipeline**: Kiểm tra chất lượng mã nguồn (ESLint + Prettier), chạy Integration Test và tự động build/push Docker Image lên Docker Hub khi push code.

---

## 🤸 KHỞI CHẠY NHANH (QUICK START)

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Thiết lập Biến Môi Trường
Tạo file `.env` tại thư mục gốc của dự án:
```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

# Chuỗi kết nối Neon Postgres (Lấy từ https://console.neon.tech/)
DATABASE_URL=postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require

# Arcjet Key (Lấy từ https://arcjet.com/)
ARCJET_KEY=ajkey_your_key_here

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Đồng bộ Database Migration
```bash
npm run db:generate   # Tạo file migration SQL từ schema models
npm run db:migrate    # Áp dụng migration vào CSDL
```

### 4. Khởi chạy Server
- **Chạy trực tiếp trên máy Host (Local Node.js)**:
  ```bash
  npm run dev
  ```
- **Chạy môi trường Dev hoàn chỉnh với Docker & Neon Local**:
  ```bash
  npm run dev:docker
  ```

Truy cập kiểm tra trạng thái tại: [http://localhost:3000/health](http://localhost:3000/health).

---

## 📋 BẢNG TRA CỨU SCRIPTS (NPM SCRIPTS)

| Lệnh | Chức năng thực hiện |
| :--- | :--- |
| `npm run dev` | Khởi động server với chế độ Hot-reload (`node --watch`) |
| `npm start` | Chạy server một lần ở chế độ production |
| `npm run lint` | Quét kiểm tra lỗi cú pháp và quy chuẩn code (ESLint) |
| `npm run lint:fix` | Tự động sửa các lỗi linting có thể tự fix |
| `npm run format` | Tự động định dạng toàn bộ mã nguồn bằng Prettier |
| `npm run db:generate` | Sinh file SQL migration từ thư mục `src/models/` |
| `npm run db:migrate` | Áp dụng SQL migration vào database |
| `npm run db:studio` | Mở giao diện Drizzle Studio trực quan trên trình duyệt |
| `npm test` | Chạy toàn bộ các bài kiểm thử tự động với Jest & Supertest |
| `npm run dev:docker` | Chạy container môi trường Development (có Neon Local proxy) |
| `npm run prod:docker` | Chạy container môi trường Production |

---

## 🧪 KIỂM THỬ API VỚI POSTMAN

Toàn bộ 9 API mẫu, kịch bản test phân quyền và file JSON Collection có sẵn tại [**`POSTMAN_GUIDE.md`**](./POSTMAN_GUIDE.md).

```bash
# 1. Health Check
curl http://localhost:3000/health

# 2. Đăng ký tài khoản
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@example.com","password":"Password123"}'
```

---
*Dự án phát triển dựa trên [adrianhajdin/acquisitions](https://github.com/adrianhajdin/acquisitions) thuộc khóa học DevOps & Backend API Architecture.*
