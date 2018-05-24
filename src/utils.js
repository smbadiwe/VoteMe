import { readdirSync, statSync } from "fs";
import { join, relative } from "path";
import upath from "upath";

export const listFilesInFolderRecursively = function(dir, filelist) {
  const files = readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      filelist = listFilesInFolderRecursively(filePath, filelist);
    } else {
      const item = upath.normalizeSafe(relative("", filePath));
      //console.log(item);
      filelist.push(item);
    }
  });
  return filelist;
};
