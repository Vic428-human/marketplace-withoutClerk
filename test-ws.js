let ws = new WebSocket('ws://localhost:3000/ws?name=test'); // 當前專案的後端對應的port是3000，因為env環境有另外設定
ws.onopen = () => { console.log('✅ WS 連線成功'); ws.send('hello'); }
ws.onmessage = (e) => console.log('收到:', e.data);
ws.onerror = (e) => console.log('❌ Error:', e);
ws.onclose = () => console.log('斷線');
