# Video Streaming & DRM Implementation

This project implements a secure video streaming service using AES-128 encryption, FFmpeg, and AWS S3, along with user authentication and fingerprint-based device management.

## Features

### 1. Secure Video Encryption (AES-128 with FFmpeg)

- The uploaded videos are encrypted using **AES-128** encryption.
- Encryption keys are dynamically generated and stored securely.
- FFmpeg is used to segment the video into `.ts` files and generate an `.m3u8` playlist for HLS streaming.
- The **key information file** is used to ensure secure encryption.
- The encryption key is hashed before storing for additional security.
- **Segments are not stored anywhere**, ensuring a higher level of security by keeping them transient.

### 2. AWS S3 Storage

- The `.m3u8` playlist is uploaded to an **S3 bucket**.
- Pre-signed URLs are generated for secure access to the playlist.
- The video bucket structure follows a UUID-based naming convention to prevent URL guessing.

### 3. Digital Rights Management (DRM)

- Only authorized users can retrieve decryption keys.
- The encryption key and IV are delivered securely via an API with CORS protection.
- The system ensures that unauthorized access to decryption keys is blocked.

### 4. User Authentication & FingerprintJS Integration

- User authentication is handled via JWT.
- **FingerprintJS** is used for device recognition, ensuring that each user session is uniquely tied to a specific device.
- This prevents unauthorized access by detecting device spoofing attempts.
- Users can manage and remove their registered devices from their account, ensuring tighter session control.

## Technologies Used

- **Next.js** (API routes for handling authentication and video encryption)
- **FFmpeg** (for HLS conversion and AES-128 encryption)
- **AWS S3** (for storing `.m3u8` playlists securely)
- **MongoDB** (for storing user sessions and video metadata)
- **FingerprintJS** (for tracking user devices and enhancing security)
- **bcrypt.js** (for hashing encryption keys)

## Security Considerations

- **Encryption Key Management:** The encryption key is never stored in plaintext.
- **Hardened API Endpoints:** Only authenticated users can request the decryption key.
- **No Direct Access to Video Segments:** Since only the `.m3u8` playlist is stored in S3 and the segments are never stored, direct access to `.ts` files is entirely prevented, reducing piracy risks significantly.

## Possible Enhancements

- Implement **token-based playback authentication**.
- Introduce **geo-restrictions** on streaming access.
- Enhance **logging and monitoring** for DRM violations.
- Optimize **HLS segmentation** for better performance.

This project ensures secure video streaming with strong encryption, DRM controls, and user authentication.
