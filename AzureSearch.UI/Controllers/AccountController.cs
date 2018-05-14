using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AzureSearch.UI.ViewModels;
using AzureSearch.DAL.Models;
using AzureSearch.DAL.Core.Interfaces;

namespace AzureSearch.UI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountManager _accountManager;
        private readonly IAuthorizationService _authorizationService;
        private const string GetUserByIdActionName = "GetUserById";

        public AccountController(IAccountManager accountManager, IAuthorizationService authorizationService)
        {
            _accountManager = accountManager;
            _authorizationService = authorizationService;
        }

        [HttpGet("users/me")]
        [Produces(typeof(UserViewModel))]
        public async Task<IActionResult> GetCurrentUser()
        {
            ApplicationUser appUser = await _accountManager.GetUserByUserNameAsync(this.User.Identity.Name);

            if (appUser != null)
                return Ok(appUser);
            else
                return NotFound(); ;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserRegisterModel user)
        {
            if (ModelState.IsValid)
            {
                if (user == null)
                    return BadRequest($"{nameof(user)} cannot be null");

                ApplicationUser appUser = new ApplicationUser();
                appUser.UserName = user.userName;
                appUser.Email = user.email;
                appUser.EmailConfirmed = true;
                appUser.IsEnabled = true;
                appUser.FullName = user.fullName;

                var result = await _accountManager.CreateUserAsync(appUser, user.Roles, user.password);
                
                UserResponseModel resp = new UserResponseModel();
                resp.result = result.Item1;

                return Ok(resp);
            }

            return BadRequest(ModelState);
        }
    }
}
