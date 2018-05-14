using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AzureSearch.UI.ViewModels;
using AzureSearch.DAL.Models;
using System.Configuration;
using AzureSearch.DAL.Core.Interfaces;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using AzureSearch.UI.Helpers;
using Microsoft.Extensions.Configuration;

namespace AzureSearch.UI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private static SearchServiceClient _searchClient;
        private static ISearchIndexClient _indexClient;
        private static string IndexName;
        public IConfiguration Config { get; }

        public static string errorMessage;

        public SearchController(IConfiguration config)
        {
            Config = config;
            try
            {
                string searchServiceName = Config["Search:ServiceName"]; 
                string apiKey = Config["Search:APIKey"]; 
                IndexName = Config["Search:IndexName"];
                
                _searchClient = new SearchServiceClient(searchServiceName, new SearchCredentials(apiKey));
                _indexClient = _searchClient.Indexes.GetClient(IndexName);
            }
            catch (Exception e)
            {
                errorMessage = e.Message.ToString();
            }
        }

        [HttpGet("document/{searchText}")]
        [Produces(typeof(DocumentSearchResult))]
        public async Task<IActionResult> GetSearch(string searchText)
        {
            SearchParameters sp = new SearchParameters()
            {
                SearchMode = SearchMode.All,
                QueryType=QueryType.Full
            };

            DocumentSearchResult doc = new DocumentSearchResult();

            Document d = new Document();

            try
            {
                string[] st = searchText.Split(' ');
                if (st.Length >= 2) searchText = searchText + "*";
                else searchText = @"/.*"+ searchText + ".*/";

                doc = _indexClient.Documents.Search(searchText, sp);
            }
            catch(Exception ex)
            {

            }

            if (doc != null)
                return Ok(doc.Results);
            else
                return NotFound(); ;
        }

        [HttpPost("document/post")]
        [AllowAnonymous]
        public async Task<IActionResult> Save(DocViewModel doc)
        {
            if (ModelState.IsValid)
            {
                if (doc == null)
                    return BadRequest($"{nameof(doc)} cannot be null");
                else
                {
                    doc.id = Guid.NewGuid().ToString();

                    var docviews = new DocViewModel[]
                    {
                        doc
                    };

                    var batch = IndexBatch.Upload(docviews);

                    try
                    {
                        _indexClient.Documents.Index(batch);
                    }
                    catch (IndexBatchException e)
                    {

                    }
                }

                return Ok(doc);
            }

            return BadRequest(ModelState);
        }
    }
}
