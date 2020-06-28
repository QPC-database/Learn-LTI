﻿using System.Threading.Tasks;
using IdentityModel.Client;

namespace Edna.Bindings.LtiAdvantage.Services
{
    public interface IAccessTokenService
    {
        Task<TokenResponse> GetAccessTokenAsync(string clientId, string accessTokenEndpoint, string scope, string keyVaultKeyString);
    }
}