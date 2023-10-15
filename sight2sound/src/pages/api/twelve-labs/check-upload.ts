// const TASK_STATUS_URL = `${API_URL}/tasks/${TASK_ID}`;
// const uploadResp: any = await new Promise((res) => {
//   const interval = setInterval(async () => {
//     const { data: response } = await axios.get(TASK_STATUS_URL, {
//       headers: {
//         "x-api-key": process.env.TWELVE_LABS_API_KEY,
//       },
//     });
//     if (response.status == "ready") {
//       clearInterval(interval);
//       res(response);
//     }
//   }, 1000);
// });
// const VIDEO_ID = uploadResp.video_id;
