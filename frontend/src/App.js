import React, { useState } from 'react';

function App() {
  const [sending, setSending] = useState(false);
  const MESSAGE =
    '타임머신 소개 영상 검토해준다면서 어디 간 거야! 빨리 내 책상 와서 영상 재생해 봐.';

  const sendPush = async () => {
    setSending(true);
    try {
      const res = await fetch(process.env.REACT_APP_API_BASE_URL + '/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TEXT',
          content: MESSAGE,
          emoticonRes: '',
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      alert('메시지 전송 성공!');
    } catch (err) {
      console.error(err);
      alert('전송 실패: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>푸시 메시지 발송 대시보드</h1>
      <button
        onClick={sendPush}
        disabled={sending}
        style={{
          padding: '10px 20px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
        }}
      >
        {sending ? '전송 중…' : '톡으로 보내기'}
      </button>
    </div>
  );
}

export default App;