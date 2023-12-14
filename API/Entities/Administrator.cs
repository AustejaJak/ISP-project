﻿namespace API.Entities
{
    public class Administrator
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!; 
        public string Surname { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
