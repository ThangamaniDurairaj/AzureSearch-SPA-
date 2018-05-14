
using AzureSearch.DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzureSearch.DAL.Core.Interfaces
{
    public interface IAccountManager
    {
        Task<bool> CheckPasswordAsync(ApplicationUser user, string password);
        Task<Tuple<bool, string[]>> CreateUserAsync(ApplicationUser user, IEnumerable<string> roles, string password);
        Task<ApplicationUser> GetUserByUserNameAsync(string userName);
    }
}
