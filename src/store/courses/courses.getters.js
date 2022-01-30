import {date} from "quasar";

export default /* state */ {

  coursesSize: (state) => Object.keys(state.courses).length,

  // timeSince: (state) => {
  //   debugger
  //   let Times = []
  //   Object.assign(Times, state.courses)
  //   for (let time1 of Times) {
  //     debugger
  //     let x  = this.test()
  //     time1.TimeUpload = this.Help(time1.TimeUpload)
  //     debugger
  //   }
  //   return Times
  // },
  // Help: (time) => {
  //   debugger
  //   var seconds = Math.floor((new Date() - time) / 1000);
  //
  //   var interval = seconds / 31536000;
  //
  //   if (interval > 1) {
  //     return Math.floor(interval) + " years";
  //   }
  //   interval = seconds / 2592000;
  //   if (interval > 1) {
  //     return Math.floor(interval) + " months";
  //   }
  //   interval = seconds / 86400;
  //   if (interval > 1) {
  //     return Math.floor(interval) + " days";
  //   }
  //   interval = seconds / 3600;
  //   if (interval > 1) {
  //     return Math.floor(interval) + " hours";
  //   }
  //   interval = seconds / 60;
  //   if (interval > 1) {
  //     return Math.floor(interval) + " minutes";
  //   }
  //   return Math.floor(seconds) + " seconds";

//     var aDay = 24 * 60 * 60 * 1000;
// // console.log(timeSince(new Date(Date.now() - aDay)));
//     debugger
//   }
}
