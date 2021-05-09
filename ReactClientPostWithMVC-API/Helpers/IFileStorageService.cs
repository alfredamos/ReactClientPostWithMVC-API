﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientPostWithMVC_API.Helpers
{
    public interface IFileStorageService
    {       
        Task DeleteFile(string fileRoute, string containerName);
        Task<string> EditFile(byte[] content, string extension, string containerName, string fileRoute);
        Task<string> SaveFile(byte[] content, string extension, string containerName); 

    }
}
