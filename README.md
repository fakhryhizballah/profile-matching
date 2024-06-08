
# Profile Matching REST API

Profile Matching adalah metode yang digunakan untuk mencocokkan profil individu atau objek dengan profil lain berdasarkan kriteria tertentu.
Dalam aplikasi profile matching yang kami kembangkan, sistem ini digunakan untuk memberikan rekomendasi dalam menentukan jurusan kuliah bagi siswa-siswi SMA.



## Installation
Berikut adalah petunjuk instalasi untuk REST API profile matching sistem rekomendasi penentuan jurusan kuliah bagi siswa-siswi SMA:

```bash
  git clone https://github.com/fakhryhizballah/profile-matching.git
  cd profile-matching
```

Setelah setup Environment Variables jalankan scrip
untuk memulai pertamakali
```bash
   npm run build
   npm run dev
```
## Environment Variables

Untuk menjalankan proyek ini, Anda perlu menambahkan variabel lingkungan berikut ke file .env yang dapat di copy dari file env

#### SQL SECURITY
```bash
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_DIALECT=mariadb
NODE_ENV=development
```
#### JWT SECURITY

```bash
JWT_SECRET_KEY=
```
#### Server Port
```bash
PORT=8000
```



## API Reference

## Authentication
### Login
- **Endpoint**: `POST {{host}}/api/auth/login`
- **Description**: Login to the system and obtain access and refresh tokens.
- **Request Body**:
  ```json
  {
    "username": "amirullazmi",
    "password": "12345"
  }
  ```

## Import Postman Collection
Untuk menguji API, impor koleksi Postman dari `./api/PROFILE MATCHING.postman_collection.json`



## Authors

- [@fakhryhizballah](https://github.com/fakhryhizballah)

