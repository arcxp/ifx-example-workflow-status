const axios = require('axios');
const arcApiHost = process.env.API_HOST;
const arcPat = process.env.ACCESS_TOKEN;

/* 
Note that when the story is updated, the
updated status will not show in Composer
without refreshing the page
*/

/* This can be updated to any desired event */
const storyFirstPublish = async (event) => {
  const result = await updateWorkflowStatus(event);
}

async function updateWorkflowStatus(event) {
  const storyId = event.body.id;
  let draftAns = await getDraftANS(storyId);

  /* Set the workflow status to 3
  (Published for my org, but could be different for yours)
  */
  draftAns.workflow.status_code = 3;
  const saveDraft = await putDraft(draftAns, storyId);
  if (saveDraft) {
    const pubStory = await publishStory(storyId);
    if (pubStory) {
      console.log('Process complete');
    }
  }
  return { "status": "event processed correctly" }
}

async function getDraftANS(storyId) {
  try {
    const headers = { "Authorization": `Bearer ${arcPat}` };
    const ans = await axios.get(`${arcApiHost}/draft/v1/story/${storyId}/revision/draft`, {
      headers: headers
    });
    return ans.data.ans;
  } catch (err) {
    console.log("Something went wrong getting full ans", err);
  }
};

/* 
  Save the draft of the story
*/
async function putDraft(draftAns, storyId) {
  const headers = { "Authorization": `Bearer ${arcPat}` };
  const putAns = await axios.put(`${arcApiHost}/draft/v1/story/${storyId}/revision/draft`, { "ans": draftAns }, {
    headers: headers
  });
  const status = await putAns.status;
  if (status !== 200) {
    return false;
  }
  console.log('Draft saved: ', storyId);
  return true;
}

async function publishStory(storyId) {
  const headers = { "Authorization": `Bearer ${arcPat}` };
  const postAns = await axios.post(`${arcApiHost}/draft/v1/story/${storyId}/revision/published`, { }, {
    headers: headers
  });
  const status = await postAns.status;
  if (status !== 200) {
    return false;
  }
  console.log('Publish story executed: ', storyId);
  return true;
};

module.exports = storyFirstPublish;