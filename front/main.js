const attendBtn = document.getElementById('attend-btn');
const declineBtn = document.getElementById('decline-btn');
const modifyBtn = document.getElementById('modify-btn');
const voteButtons = document.querySelector('.button-container');
const postBtn = document.getElementById('post-btn');
const postContent = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');

// const BASE_URL = 'http://localhost:8080';
const BASE_URL =
  'https://port-0-tetz-night-back-m5yo5gmx92cc34bc.sel4.cloudtype.app';

let userId;

// UUID 생성 함수
const generateUUID = () => {
  return (
    'uuid-' +
    Math.random().toString(36).substr(2, 6) +
    '-' +
    Math.random().toString(36).substr(2, 3)
  );
};

// 로컬스토리지 체크
const checkVoteStatus = () => {
  const hasVoted = localStorage.getItem('tetzNightVote');
  if (hasVoted) {
    attendBtn.style.display = 'none';
    declineBtn.style.display = 'none';
    modifyBtn.style.display = 'block';
  }
};

// UUID 체크 및 생성
const checkAndGenerateUUID = () => {
  userId = localStorage.getItem('tetzNightUserId');
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem('tetzNightUserId', userId);
  }
  return userId;
};

// 초기 로드시 체크
checkVoteStatus();
checkAndGenerateUUID();

// 참여 버튼 클릭
attendBtn.addEventListener('click', async () => {
  const userId = localStorage.getItem('tetzNightUserId');

  try {
    const response = await fetch(`${BASE_URL}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userId,
        voteType: '참여',
      }),
    });

    if (response.status === 200) {
      localStorage.setItem('tetzNightVote', 'attend');
      checkVoteStatus();
      loadVotes();
    } else {
      alert(
        '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
      );
      throw new Error('투표 전송 실패');
    }
  } catch (error) {
    alert(
      '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
    );
    console.error('투표 전송 중 오류 발생:', error);
  }
});

// 불참 버튼 클릭
declineBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(`${BASE_URL}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userId,
        voteType: '불참',
      }),
    });

    if (response.status === 200) {
      localStorage.setItem('tetzNightVote', 'decline');
      checkVoteStatus();
      loadVotes();
    } else {
      alert(
        '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
      );
      throw new Error('투표 전송 실패');
    }
  } catch (error) {
    alert(
      '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
    );
    console.error('투표 전송 중 오류 발생:', error);
  }
});

// 수정 버튼 클릭
modifyBtn.addEventListener('click', () => {
  localStorage.removeItem('tetzNightVote');
  attendBtn.style.display = 'block';
  declineBtn.style.display = 'block';
  modifyBtn.style.display = 'none';
});

// 투표 현황 불러오기
const loadVotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/vote`);
    const votes = await response.json();
    const attendCount = document.getElementById('attendCount');
    attendCount.textContent = `${votes.attend}명`;
  } catch (error) {
    console.error('투표 수 로딩 중 오류 발생:', error);
    attendCount.textContent = '서버 오류';
  }
};

// 게시글 불러오기
const loadPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/post`, {
      headers: {
        uuid: userId,
      },
    });
    const posts = await response.json();

    postsContainer.innerHTML = posts
      .map(
        (post) => `
            <div class="post">
              <span class="post-user" style="font-size: 20px">✏️ ${post.user.replace(
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
              <button id="like-btn" class="btn" onclick="likePost('${post.id}')"
                style="background: ${
                  post.liked
                    ? 'linear-gradient(45deg, #ff1493, #ff69b4)'
                    : 'linear-gradient(45deg, #808080, #a9a9a9)'
                }; font-size: 20px">
                👍 <span class="like-count">${post.likeCount || 0}</span>
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

// 게시글 작성
postBtn.addEventListener('click', async () => {
  const content = postContent.value;

  if (!content) {
    alert('내용을 입력해주세요!');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userId,
        content,
      }),
    });

    if (response.status === 201) {
      postContent.value = '';
      loadPosts();
    } else {
      alert(
        '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
      );
    }
  } catch (error) {
    console.error('게시글 작성 중 오류 발생:', error);
    alert(
      '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
    );
  }
});

// 엔터키로 게시글 작성
postContent.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const content = postContent.value;

    if (!content) {
      alert('내용을 입력해주세요!');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userId,
          content,
        }),
      });

      if (response.status === 201) {
        postContent.value = '';
        loadPosts();
      } else {
        alert(
          '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
        );
      }
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error);
      alert(
        '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
      );
    }
  }
});

// 게시글 좋아요
const likePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        uuid: userId,
      },
    });

    if (response.status === 200) {
      loadPosts();
    } else {
      alert(
        '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
      );
    }
  } catch (error) {
    console.error('좋아요 중 오류 발생:', error);
    alert(
      '죄송 합니다. 백엔드 서버가 죽었습니다 ㅠㅠ\n빠르게 수정 하겠습니다 by tetz'
    );
  }
};

// 초기 로딩
loadPosts();
loadVotes();
