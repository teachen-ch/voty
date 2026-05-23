import { useEffect } from "preact/hooks";
import { pb } from "../pb";
import {
  stickyNotes,
  applyNoteEvent,
  discussionBoards,
  argumentRecords,
  argumentVotes,
  applyDiscussionBoardEvent,
  applyArgumentEvent,
  applyArgumentVoteEvent,
  votings,
  participantVotes,
  applyVotingEvent,
  applyParticipantVoteEvent,
  timers,
  applyTimerEvent,
  cacheParticipants,
} from "../store";

export function useRoomData(roomId: string) {
  useEffect(() => {
    pb.collection("sticky_notes")
      .getList(1, 500, { filter: `room = "${roomId}"` })
      .then((res) => (stickyNotes.value = res.items));
    pb.collection("sticky_notes").subscribe("*", (e) => {
      if (e.record.room !== roomId) return;
      applyNoteEvent(e.action, e.record);
    });

    pb.collection("discussion_boards")
      .getList(1, 200, { filter: `room = "${roomId}"` })
      .then(async (res) => {
        discussionBoards.value = res.items;
        const boardIds = res.items.map((b) => b.id);
        if (boardIds.length === 0) {
          argumentRecords.value = [];
          argumentVotes.value = [];
          return;
        }
        const argRes = await pb.collection("arguments").getList(1, 500, {
          filter: boardIds
            .map((id) => `discussion_board = "${id}"`)
            .join(" || "),
        });
        argumentRecords.value = argRes.items;
        const argIds = argRes.items.map((a) => a.id);
        if (argIds.length === 0) {
          argumentVotes.value = [];
          return;
        }
        const voteRes = await pb.collection("argument_votes").getList(1, 2000, {
          filter: argIds.map((id) => `argument = "${id}"`).join(" || "),
        });
        argumentVotes.value = voteRes.items;
      });

    pb.collection("discussion_boards").subscribe("*", (e) => {
      if (e.record.room && e.record.room !== roomId) return;
      applyDiscussionBoardEvent(e.action, e.record);
    });
    pb.collection("arguments").subscribe("*", (e) => {
      applyArgumentEvent(e.action, e.record);
    });
    pb.collection("argument_votes").subscribe("*", (e) => {
      applyArgumentVoteEvent(e.action, e.record);
    });

    pb.collection("votings")
      .getList(1, 200, { filter: `room = "${roomId}"` })
      .then(async (res) => {
        votings.value = res.items;
        const ids = res.items.map((v) => v.id);
        if (ids.length === 0) {
          participantVotes.value = [];
          return;
        }
        const voteRes = await pb
          .collection("participant_votes")
          .getList(1, 5000, {
            filter: ids.map((id) => `voting = "${id}"`).join(" || "),
          });
        participantVotes.value = voteRes.items;
      });

    pb.collection("votings").subscribe("*", (e) => {
      if (e.record.room && e.record.room !== roomId) return;
      applyVotingEvent(e.action, e.record);
    });
    pb.collection("participant_votes").subscribe("*", (e) => {
      applyParticipantVoteEvent(e.action, e.record);
    });

    pb.collection("timers")
      .getList(1, 200, { filter: `room = "${roomId}"` })
      .then((res) => (timers.value = res.items));
    pb.collection("timers").subscribe("*", (e) => {
      if (e.record.room && e.record.room !== roomId) return;
      applyTimerEvent(e.action, e.record);
    });

    pb.collection("participants")
      .getList(1, 200, { filter: `room = "${roomId}"` })
      .then((res) => cacheParticipants(res.items));

    return () => {
      pb.collection("sticky_notes").unsubscribe("*");
      pb.collection("discussion_boards").unsubscribe("*");
      pb.collection("arguments").unsubscribe("*");
      pb.collection("argument_votes").unsubscribe("*");
      pb.collection("votings").unsubscribe("*");
      pb.collection("participant_votes").unsubscribe("*");
      pb.collection("timers").unsubscribe("*");
    };
  }, [roomId]);
}
