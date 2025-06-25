"use client";

import { useState, useEffect } from "react";

export default function MsgPage() {

  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    // フェッチして自身のメッセージ一覧を取得する
  }, []);

  return (<>
    <main>
    <div>ここにループさせる</div>
    </main>

  </>);
}
