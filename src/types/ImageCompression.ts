export type ImageCompressionOptions = { 
  maxSizeMB?: number,        
  maxWidthOrHeight?: number,
  // onProgress?: Function, 
  useWebWorker?: boolean,
  libURL?: string,
  preserveExif?: boolean,
  signal?: AbortSignal, 
  maxIteration?: number,
  exifOrientation?: number,
  fileType?: string,
  initialQuality?: number,
  alwaysKeepResolution?: boolean
}