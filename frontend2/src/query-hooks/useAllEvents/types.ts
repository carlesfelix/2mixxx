import Async from "@/core/core-types/Async";
import BaseEntity from "@/core/core-types/BaseEntity";

export type EventEntity = {
  code: string;
  allowSongRequests: boolean;
  canModerate: boolean;
} & BaseEntity;

export type UseAllEventsReturn = {
  events: Async<EventEntity[]>;
  removeEvent: (eventId: string) => Promise<void>;
};
