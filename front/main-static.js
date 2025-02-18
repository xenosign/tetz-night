const postsContainer = document.getElementById('posts-container');

const staticPosts = [
  {
    id: 'post-1',
    author: '이효석',
    content: '여러분 참가비는 사실 없습니다! 제가 쏩니다~ 👍',
    likes: 66,
  },
  {
    id: 'post-2',
    author: 'z3s8b7-iyz',
    content: '',
    likes: 14,
  },
  {
    id: 'post-3',
    author: 'j4rd5z-lyn',
    content: '그 신상아 였나..? 예쁜 누나도 오시나요?',
    likes: 12,
  },
  {
    id: 'post-4',
    author: 'tetz',
    content: '1기요 ㅋ',
    likes: 10,
  },
  {
    id: 'post-5',
    author: '???',
    content: '테츠님 1기랑 5기랑 누가 더 코딩 잘하나요?',
    likes: 9,
  },
  {
    id: 'post-6',
    author: 'nez1uj-ic0',
    content: '대흥역 얼짱 백진솔♡',
    likes: 7,
  },
  {
    id: 'post-7',
    author: 'mvj1nu-1og',
    content: '안녕하세요~!!!! 다들 반가워요 ㅎㅎㅎㅎ',
    likes: 5,
  },
  {
    id: 'post-8',
    author: '6gdh78-oga',
    content: '참가비는 문준일이 쏜다',
    likes: 5,
  },
  {
    id: 'post-9',
    author: 'qnlz1f-gu4',
    content: '문준일 | 내가 쏠테니 다들 맛있게먹어~',
    likes: 5,
  },
  {
    id: 'post-10',
    author: 'x50b7z-5e5',
    content: '안녕하세요!!',
    likes: 4,
  },
  {
    id: 'post-11',
    author: 'bnd95n-8u8',
    content: '이효석의 밤... 너무나도 기대됩니다',
    likes: 4,
  },
  {
    id: 'post-12',
    author: '6gdh78-oga',
    content: '디자인 구려요',
    likes: 4,
  },
  {
    id: 'post-13',
    author: 'w9szqo-nvx',
    content:
      '신상아 누나 댓글 범인 자백하시면 요거트월드 사드리겠습니다 - 🍨🥄',
    likes: 4,
  },
  {
    id: 'post-14',
    author: 'hvlxpl-61y',
    content: '다들 뭐하고 지내셨는지 궁금해요!',
    likes: 2,
  },
  {
    id: 'post-15',
    author: '18g621-eqf',
    content: '병뚜껑 선 가까이 보내기✌🏻',
    likes: 2,
  },
  {
    id: 'post-16',
    author: 'oj4oak-ohn',
    content: '22일 안되나요 흑흑',
    likes: 1,
  },
  {
    id: 'post-17',
    author: '4gyu2e-ea0',
    content: '블링블링 이즈 준일',
    likes: 1,
  },
  {
    id: 'post-18',
    author: '5i0gpn-p0s',
    content:
      '저번 회식때 텟츠님이 쏜다했는데 남은사람들 주방에서 설거지하고 서빙했음',
    likes: 1,
  },
  {
    id: 'post-19',
    author: 'qsggrq-k3q',
    content: '1기짱',
    likes: 1,
  },
  {
    id: 'post-20',
    author: 'z3s8b7-iyz',
    content: 'ㅎㅇ',
    likes: 0,
  },
  {
    id: 'post-21',
    author: 'l4vqy6-m8h',
    content: '잠자는 텟츠 깨우기',
    likes: 0,
  },
  {
    id: 'post-22',
    author: '2t3c01-p71',
    content: '여러분 멈춰!! 저 운동 가야해요 ㅋㅋㅋㅋ -_-;;;;',
    likes: 0,
  },
  {
    id: 'post-23',
    author: 'oj4oak-ohn',
    content: '우와',
    likes: 0,
  },
  {
    id: 'post-24',
    author: 'z3s8b7-iyz',
    content: 'hello world',
    likes: 0,
  },
  {
    id: 'post-25',
    author: 'z3s8b7-iyz',
    content: '보고싶어요~',
    likes: 0,
  },
  {
    id: 'post-26',
    author: 'fhi1nf-7xr',
    content: '텟츠쨩',
    likes: 0,
  },
  {
    id: 'post-27',
    author: '1oy4mu-m9b',
    content: '우와 기대된다~',
    likes: 0,
  },
  {
    id: 'post-28',
    author: 'qd3cr8-py9',
    content: '하이',
    likes: 0,
  },
  {
    id: 'post-29',
    author: 'qd3cr8-py9',
    content: 'alert("해킹성공");',
    likes: 0,
  },
  {
    id: 'post-30',
    author: 'qd3cr8-py9',
    content: '',
    likes: 0,
  },
  {
    id: 'post-31',
    author: 'qd3cr8-py9',
    content: 'ㅎ',
    likes: 0,
  },
  {
    id: 'post-32',
    author: 'qd3cr8-py9',
    content: '<img src=x onerror="alert(1)">',
    likes: 0,
  },
  {
    id: 'post-33',
    author: 'qd3cr8-py9',
    content: '<img src=x onerror="alert(해킹성공)">',
    likes: 0,
  },
  {
    id: 'post-34',
    author: 'qd3cr8-py9',
    content: '<img src=x onerror="alert(\\"해킹성공\\")" />',
    likes: 0,
  },
  {
    id: 'post-35',
    author: '2t3c01-p71',
    content: '해킹 방지 -_-V',
    likes: 0,
  },
  {
    id: 'post-36',
    author: 'od9a43-8d5',
    content: 'DROP TABLE BOARD CASCADE CONSTRAINTS;',
    likes: 0,
  },
  {
    id: 'post-37',
    author: '2t3c01-p71',
    content: 'db 변경 테스트!',
    likes: 0,
  },
  {
    id: 'post-38',
    author: '4i3dnu-to4',
    content: '냥',
    likes: 0,
  },
];

// 게시글 불러오기
const loadPosts = async () => {
  try {
    const posts = staticPosts;

    postsContainer.innerHTML = posts
      .map(
        (post) => `
            <div class="post">
              <span class="post-user" style="font-size: 20px">✏️ ${post.author.replace(
                'uuid-',
                ''
              )} | </span>
              <span class="post-content" style="font-size: 20px">${
                post.content.includes('onerror')
                  ? post.content.replace(/[<>]/g, (match) =>
                      match === '<' ? '&lt;' : '&gt;'
                    )
                  : post.content
              }</span>
              <button id="like-btn" class="btn"
                style="background: linear-gradient(45deg, #808080, #a9a9a9); font-size: 20px">
                👍 <span class="like-count">${post.likes || 0}</span>
              </button>
            </div>
          `
      )
      .join('');
  } catch (error) {
    console.error('게시글 로딩 중 오류 발생:', error);
    postsContainer.innerHTML =
      '<h3 style="text-align: center; color: white;">죄송합니다. 백엔드 서버가 죽었어요 ㅠㅠ</h3>';
  }
};

loadPosts();
