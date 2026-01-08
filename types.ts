
export enum AppStep {
  LANDING = 'LANDING',
  UPLOAD = 'UPLOAD',
  DETAILS = 'DETAILS',
  STYLE = 'STYLE',
  CHECKOUT = 'CHECKOUT',
  SUCCESS = 'SUCCESS',
  LEGAL = 'LEGAL'
}

export enum PackageType {
  STANDARD = 'standard',
  PREMIUM = 'premium',
  RUSH = 'rush'
}

export interface MemorialData {
  petName: string;
  birthDate: string;
  passedDate: string;
  message: string;
  template: string;
  music: {
    source: 'library' | 'upload';
    libraryTrackId: string | null;
    uploadedAudio: File | null;
  };
  package: PackageType;
  files: File[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  previewColor: string;
}

export interface LibraryTrack {
  id: string;
  title: string;
  duration: string;
}
