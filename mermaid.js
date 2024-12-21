// YAML 파일 로드 및 Mermaid 초기화
async function loadYAML(url) {
    const response = await fetch(url);
    const yamlText = await response.text();
    return jsyaml.load(yamlText);
}

function renderProjects(data) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const mermaidContainer = document.getElementById('mermaid-container');

    document.querySelectorAll('.btn.btn-diagram').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const projectId = this.getAttribute('data-id');
            const project = data.find(p => p.id === parseInt(projectId));

            if(project === undefined) {
                return false;
            }
            modalTitle.innerText = project.title;

            // Mermaid 다이어그램 정의를 data-diagram 속성으로 저장
            mermaidContainer.setAttribute('data-diagram', project.diagram);
            mermaidContainer.innerHTML = `<div class="mermaid">${project.diagram}</div>`;

            // Mermaid 다이어그램 다시 초기화
            mermaid.init(undefined, document.querySelectorAll('.mermaid'));

            modal.style.display = 'block';
            document.body.classList.add('modal-open'); // 부모 창 스크롤 멈춤
        });
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // 부모 창 스크롤 재활성화
        mermaidContainer.innerHTML = ""; // 다이어그램 초기화
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
}

// YAML 파일 로드 및 프로젝트 렌더링
loadYAML('diagrams.yml').then(data => renderProjects(data.projects));

// Mermaid.js 초기화 (한 번만 실행)
document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({
        startOnLoad: false, // 자동 렌더링 비활성화
        theme: 'base', // 기본 테마 설정
    });
});
