using AutoMapper;
using ReactClientPostWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientPostWithMVC_API.Mappings
{
    public class Mapp : Profile
    {
        public Mapp()
        {
            CreateMap<Author, Author>();
            CreateMap<Post, Post>();
        }
    }
}
