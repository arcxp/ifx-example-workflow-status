Example code is provided by a community of developers. They are intended to help you get started more quickly, but are not guaranteed to cover all scenarios nor are they supported by Arc XP.

> These examples are licensed under the [MIT license](https://mit-license.org/): THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Reiterated from license above, all code in this example is free to use, and as such, there is NO WARRANTY, SLA or SUPPORT for these examples.


# Description
In this recipe we will be automatically changing a story's workflow status when it is first published. You are welcome to change this logic to do whatever you like, such as update workflow status on all story updates.

# Instructions

## Create your own repo
Clone this code locally and push it up to your own repo

## Running the integration locally
run `npm i`

run `npm run localTestingServer`

### Create a .env file
_This file should never be committed to your repo._
Inside this file, define two variables: `ACCESS_TOKEN` and `API_HOST`
`ACCESS_TOKEN` should be a PAT you have created in developer center.
`API_HOST` should be your base API URL

### Send POST
Send a POST request to `http://127.0.0.1:8080/ifx/local/invoke/`, with the body of an event using a test story. 

_As a tip, you can change the ID to any story you like just for testing._

Event body:
```
{
    "version": 2,
    "key": "story:update",
    "body": {ANS GOES HERE},
    "typeId": 1,
    "time": null,
    "uuid": ""
}
```

## Running the integration on Sandbox
_This assumes you have [created an integration](https://alc-swagger-template.s3.amazonaws.com/docs/swagger/index.html?url=ifx/admin/prod/swagger.json#operations-integrations-Create-a-new), [uploaded, deployed, and promoted](https://alc-swagger-template.s3.amazonaws.com/docs/swagger/index.html?url=ifx/admin/prod/swagger.json#operations-tag-bundles) your code to Sandbox._

## Steps
1. Subscribe to the desired event, such as `story:first-publish` (later, you can change this to any event you want)
2. Create a new story, save it, then publish it
3. When you refresh the page, the Workflow Status should represent your org's status #3
