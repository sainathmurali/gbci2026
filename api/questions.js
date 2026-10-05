// Serverless API Handler: Real-Time Messenger for Poster #105
// Supports Attendee direct messaging and Author (Sainath Murali) two-way replies

let threads = [
  {
    id: "thread-1",
    name: "Dr. Lukas Weber",
    affiliation: "TU Graz / BCI Lab",
    createdAt: "2026-09-10T10:30:00Z",
    lastActive: "2026-09-10T11:15:00Z",
    messages: [
      {
        id: "msg-1-1",
        sender: "attendee",
        senderName: "Dr. Lukas Weber",
        text: "Why was the trial-wise pre-cue baseline chosen as the rest reference instead of a separate continuous resting-state recording?",
        timestamp: "2026-09-10T10:30:00Z"
      },
      {
        id: "msg-1-2",
        sender: "author",
        senderName: "Sainath Murali (Author)",
        text: "Great question! The pre-cue baseline (-1.5s to 0s) was chosen to remain strictly consistent with the foundational work by Lotte & Jeunet (2018) and to isolate dynamic, trial-by-trial task vs. baseline divergence. Because resting states drift over long experimental blocks, trial-wise baselines capture run-wise neural adaptation during MI training much more sensitively than a static baseline.",
        timestamp: "2026-09-10T11:15:00Z"
      }
    ]
  },
  {
    id: "thread-2",
    name: "Prof. Elena Rossi",
    affiliation: "BCI Society Member",
    createdAt: "2026-09-10T12:00:00Z",
    lastActive: "2026-09-10T12:45:00Z",
    messages: [
      {
        id: "msg-2-1",
        sender: "attendee",
        senderName: "Prof. Elena Rossi",
        text: "How do you reconcile the fact that both Improved and Worsened groups showed increasing left-right distinctiveness?",
        timestamp: "2026-09-10T12:00:00Z"
      },
      {
        id: "msg-2-2",
        sender: "author",
        senderName: "Sainath Murali (Author)",
        text: "This is precisely the core message of our paper: hemispheric laterality alone is insufficient! While the Worsened group managed to separate left and right MI centroids, their covariance matrices exhibited degrading stability across trials and collapsed toward the resting baseline. True skill acquisition in MI-BCI requires coordinated evolution: class distinctiveness + class stability + rest distinctiveness.",
        timestamp: "2026-09-10T12:45:00Z"
      }
    ]
  }
];

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Fetch all conversation threads
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      threads: threads
    });
  }

  // POST: Send a message (Attendee or Author)
  if (req.method === "POST") {
    try {
      const {
        threadId,
        name,
        affiliation,
        text,
        question, // backwards compatibility
        isAuthor,
        passcode,
        replyToId, // backwards compatibility
        replyText
      } = req.body || {};

      const content = (text || question || replyText || "").trim();
      if (!content || content.length < 2) {
        return res.status(400).json({ success: false, error: "Message text is required." });
      }

      // Case 1: Author Reply
      if (isAuthor || replyToId || (passcode && passcode.toLowerCase().trim() === "sainath105")) {
        const targetId = threadId || replyToId;
        let thread = threads.find(t => t.id === targetId);
        
        if (!thread && threads.length > 0) {
          thread = threads[0];
        }

        if (thread) {
          const authorMsg = {
            id: "msg-" + Date.now(),
            sender: "author",
            senderName: "Sainath Murali (Author)",
            text: content,
            timestamp: new Date().toISOString()
          };
          thread.messages.push(authorMsg);
          thread.lastActive = authorMsg.timestamp;

          return res.status(200).json({
            success: true,
            message: "Reply sent successfully",
            thread: thread,
            threads: threads
          });
        }
      }

      // Case 2: Existing Attendee Thread Follow-up
      if (threadId) {
        const thread = threads.find(t => t.id === threadId);
        if (thread) {
          const newMsg = {
            id: "msg-" + Date.now(),
            sender: "attendee",
            senderName: name?.trim() || thread.name,
            text: content,
            timestamp: new Date().toISOString()
          };
          thread.messages.push(newMsg);
          thread.lastActive = newMsg.timestamp;

          return res.status(200).json({
            success: true,
            message: "Message sent",
            thread: thread,
            threads: threads
          });
        }
      }

      // Case 3: New Conversation Thread from Attendee
      const attendeeName = name?.trim() || "Conference Attendee";
      const newThread = {
        id: "thread-" + Date.now(),
        name: attendeeName,
        affiliation: affiliation?.trim() || "",
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        messages: [
          {
            id: "msg-" + Date.now(),
            sender: "attendee",
            senderName: attendeeName,
            text: content,
            timestamp: new Date().toISOString()
          }
        ]
      };

      threads.unshift(newThread);

      return res.status(201).json({
        success: true,
        message: "Your message has been sent to Sainath! You can continue chatting here.",
        thread: newThread,
        threads: threads
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
};
