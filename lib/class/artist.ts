export class Artist {
    constructor(
      public displayName: string,
      public positions: Position[],
      public sns: string,
      public description: string,
      public email: string,
      public photoURL?: string,
      public verified?: boolean,
      public uid?: string
    ) {
      this.displayName = displayName;
      this.positions = positions;
      this.sns = sns;
      this.description = description;
      this.uid = uid;
      this.email = email;
      this.photoURL = photoURL;
    }
  }