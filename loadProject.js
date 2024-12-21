async function loadProject() {
    let key = document.getElementById("access-key").value;
    const response = await fetch("index_enc.txt"); // 암호화된 파일 가져오기
    const encryptedData = await response.text();

    const response_sec = await fetch("index_enc_2.txt"); // 암호화된 파일 가져오기
    const enc2 = await response_sec.text();

    // master key
    const decryptedKey = CryptoJS.AES.decrypt(enc2, CryptoJS.enc.Utf8.parse(key + "00000"), {
        iv: "0000000000000000",
        mode: CryptoJS.mode.ECB, // ECB 모드
        padding: CryptoJS.pad.Pkcs7 // PKCS7 패딩
    });
    key = decryptedKey.toString(CryptoJS.enc.Utf8);

    try {
        // AES 복호화
        const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(key), {
            iv: "0000000000000000",
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) throw new Error("Invalid key");
        // 복호화 성공 시 화면에 표시
        document.getElementById("main").outerHTML = decryptedText;
        document.getElementById("enterkey").remove();

        loadDecryptedScript("chart.js");
        loadDecryptedScript("mermaid.js");

        // 모든 btn-diagram 요소를 선택
        document.querySelectorAll('.btn.btn-diagram').forEach((button) => {
            // 아이콘과 텍스트를 동적으로 삽입
            button.innerHTML = `
                <span class="icon">🔍</span>
                <span class="text">프로세스 보기</span>
            `;
        });

    } catch (e) {
        alert("Invalid key! Please try again.");
    }
}

// 복호화된 데이터를 사용해 스크립트 파일을 동적으로 로드
async function loadDecryptedScript(url) {
    // Create a new <script> element
    const script = document.createElement("script");
    script.src = url; // 복호화된 스크립트 경로
    script.type = "text/javascript";

    // Error handling
    script.onerror = function () {
        console.error("Failed to load the script:", url);
    };

    // Append the script to the <head> or <body>
    document.head.appendChild(script);
}

document.getElementById("go-cv-page").addEventListener('click', function(event) {
    loadProject();
});

document.getElementById("access-key").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Enter 키를 누를 때
        event.preventDefault(); // 기본 Enter 동작 방지
        document.getElementById("go-cv-page").click(); // 버튼 클릭 동작 실행
    }
});

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("access-key");

togglePassword.addEventListener("click", () => {
    // Toggle the input type
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

     togglePassword.textContent = type === "password" ? "보이기" : "숨기기";
});