export interface Meeting {
  sum: string;
  time: Date;
  end: Date;
  loc: string;
  room: number;
  organizer: {
    displayName: string;
    email: string;
    id: string;
    self: string;
  };
}
