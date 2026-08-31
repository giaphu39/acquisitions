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
chạy npm run db:migrate  thực hiện push schema lên remote neon

chạy npm i winston
tạo file config/logger.js
sau đó add middleware logger đó vào app.js

cách dùng absolute import là import something from '@/test' ?? này là sao

vào package.json thêm trường imports: {
    '#config/*': 'src/config/*' này là gì và tại sao phải làm vậy
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

