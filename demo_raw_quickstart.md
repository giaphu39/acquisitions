các lệnh khởi tạo
npm init -y
để ra package.json
npm install express dotenv
chỉnh type trong package thành module
viết file index.js
thêm scripts "dev" : "node --watch index.js"
--watch là gì có tác dụng gì?
tạo thư mục src
có app.js và index.js trong src
server.js nằm trong src luôn
3 thư mục này có mục đích khác nhau
app để tạo app với đúng middleware
server thì chạy server và giám sát
index thì là starting point để chạy server
tạo thư mục controller, middleware, config models, routes, services, utils, validations mỗi thư mục có mục đích riêng gì?

chỉnh script thêm src/index.js để trỏ đúng thứ mục
viết code cho file app.js và index.js

chạy
npm install eslint @eslint/js prettier eslint-config-prettier eslint-plugin-prettier -D

-D nghĩa là gì?
tạo file eslint.config.js
tạo file .prettierc
tạo file .prettierignore để nó không chỉnh lỗi format trong file đó
viết scripts "lint" : "eslint . --fix"
"format" :"prettier --check"

khi dùng thì npm run <tenscripts>

Sau đó vào neon : https://console.neon.tech/
chạy npm install @neondatabase/serverless drizzle-orm
npm install -D drizzle-kit

các thông tin khi cài npm install là gì và quan trọng không vd:
29 vulnerabilities (1 low, 17 moderate, 11 high)

tạo file drizzle.config.js
trong config tạo file database.js và code vào

update script 3 dạng db: generate, db:migrate, db: studio
rồi tạo file models cho user sử dụng

extension nào hỗ trợ gợi ý thư viện và hàm cho web coding?

tại sao phải có các trường created at và updated at trong schema models? bản chất schema đó là cách backend nhìn chứ nó có thể là khác với trong db đúng không?

các lệnh này chạy sẽ chạy ra cái gì?
chạy npm run db:generate thì sẽ tạo ra schema bản mẫu để add lên remote neon
chạy npm run db:migrate thực hiện push schema lên remote neon

chạy npm i winston
tạo file config/logger.js
sau đó add middleware logger đó vào app.js

cách dùng absolute import là import something from '@/test' ?? này là sao

vào package.json thêm trường imports: {
'#config/_': 'src/config/_' này là gì và tại sao phải làm vậy
tương tự cho các folder khác
}

dùng helmet để an toàn cho api
npm i helmet
thêm middleware này vào app.js
tương tự morgan để monitor traffic
npm install morgan
thêm middleware này vào app.js
tương tự cho cors
npm install cors cookie-parser

cập nhật toàn bộ middleware vào app.js

Phần authentication
tạo routes/auth.routes.js
tiếp tục dùng route đó trong app.js

sử dụng httpie để phục vụ công việc http client, hoặc postman tùy sở thích để test
localhost:3000 nó sẽ ra html kết quả
localhost:3000/health nó sẽ ra json kết quả
localhost:3000/api/users sẽ ra json kết quả

sau đó chạy npm i jsonwebtoken
tạo file utils/jwt.js với các hàm dùng jwt
tạo file utils/cookies.js

rồi npm install zod
là validate library cho schema?
tạo validations/auth.validations.js
rồi import vào routes/auth.routes.js

tạo utils/format.js
tạo controllers/auth.controller.js
test lại route trên test api

npm install bcrypt
tạo services/auth.service.js
sau đó trong auth.controller gọi auth.service đó
rồi test lại route

Sau đó instructor hướng dẫn vibecoding các route còn lại sử dụng warp

sau đó vào Arcjet một công cụ cung cấp bảo mật tốt hơn
tạo project và dán key vào .env
sau đó vào .doc get started
chỉnh sdk thành nodejs
rồi chạy npm i @arcjet/node @arcjet/inspect
copy configure của arcjet họ bảo bỏ vào index.ts nhưng ta sẽ bỏ code vào src/config/arcjet.js
chỉnh sửa lại cho phù hợp với project của mình
tạo src/middleware/security.middleware.js
code xong rồi import middleware này vào app.js

thêm scripts vào "start" : "node src/index.js" để cho khi chạy trên hệ thống thì chỉ chạy 1 lần mà không thay đổi

sau đó vibecoding tạo các file docker thực hiện dockerize

tạo scripts/dev.sh để tự động chạy docker như được dạy dạng compose dược đóng gói các lệnh để tự động hơn
sau khi chạy thành công thì test lại api
thấy bị lỗi khi dùng auth/sign-in
sửa lại database.js cho phù hợp (đây là đang sửa gì? ) mà sau đó chạy sẽ thành công

tạo scripts/prod.sh tương tự nhưng không dùng neon local mà dùng production neon,
tại sao cần dùng local cho dev? nếu dùng local thì luồn dữ liệu ở đâu thay đổi?

thêm script prod: docker trong package

Lời khuyên bạn chỉ lo việc kiến trúc cách thực hiện -> ai lo implement

Tiếp tục tạo user CRUD:
tạo users.routes.js
rồi thêm vào app.js route users
tạo file services/user.services.js
tạo file controllers/user.controller.js gọi services để lấy getAllUsers

chạy npm run dev:docker lại
test localhost:3000/api/users

sau đó chạy vibecoding task user CRUD tiếp để lấp đầy toàn bộ các route users
nhớ là cần có ma trận phân quyền cho các users với API

khi test thấy role = "admin" chỉnh được lúc tạo vậy thì có người nào ở giữa thay đổi role để thay đổi quyền hạn thì sao? có cách nào hạn chế không

Các nội dung cần coi kĩ lại là dùng test API, sử dụng được việc lấy cookies trong 1 user để thực hiện test API cho API khác để test phân quyền, cấu hình .env.\* , phân biệt các loại khi sử dụng docker hiểu rõ hơn file docker.

#testing

sử dụng jest
npm install --save-dev jest
npm init jest@latest

use jest when running test script in package.json - yes
use typescript - no

test evironment - node
just to add coverage reports - yes
which provider - v8
automatically clear mock calls,... - yes

chỉnh jest.config.js phần/thành testEnvironment: "node"
thêm imports trong package.json phần "imports": { '"#config/_"': 'src/config/_' ... }
scripts thêm "test":"NODE_OPTIONS=--experimental-vm-modules jest"

chỉnh app.js thêm app.use((req,res,next)=>{})
cho route not found

tạo tests/app.test.js
file này làm gì? các nội dung trong đây?

đọc yêu cầu để chạy actions github là required secrets
cần các trường DOCKER_USERNAME, DOCKER_PASSWORD, TEST_DATABASE_URL (lấy từ .env DATABASE_URL), NODE_ENV (nội dung là production),

vào docker desktop -> personal access tokens -> generate access token với full quyền-> vào github repo secrets and variables -> add variables như phía trên

NHẮC LẠI: focus on architecture, implement for AI AGENT
debug lại khi gặp lỗi, thường AI hay sai tên images, container thường không khớp trong file chạy docker,...

# future work

phát triển thêm API cho đúng tên acquisitions thêm các API giao dịch
sử dụng kubenetes, github actions để CI/CD
thêm giao diện sử dụng
