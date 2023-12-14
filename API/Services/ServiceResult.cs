namespace API.Services
{
    public class ServiceResult<T>
    {
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public List<string> Errors { get; set; }

        public ServiceResult()
        {
            IsSuccess = false;
            Errors = new List<string>();
        }
    }
}
