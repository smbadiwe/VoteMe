import { readdirSync, statSync } from "fs";
import { join, relative } from "path";
import upath from "upath";

export const listFilesInFolderRecursively = (dir, filelist) => {
  const files = readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      filelist = listFilesInFolderRecursively(filePath, filelist);
    } else {
      const item = upath.normalizeSafe(relative("", filePath));
      filelist.push(item);
    }
  });
  return filelist;
};

export const apiError = msg => {
  return {
    status: false,
    message: msg
  };
};

export const apiSuccess = responseData => {
  if (responseData) {
    return {
      status: true,
      data: responseData.data
    };
  }
  return {
    status: true
  };
};
