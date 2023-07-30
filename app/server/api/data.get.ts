import users from "../dbModels/user";

export default defineEventHandler(async (event) => {

  try {
    console.log("Find users");
    const usersData = await users.find();
    return {
      ok: true,
      message: "data sent",
      data: usersData.map((user) => ({
        name: user.name,
        title: user.title,
        sumTime: user.roomTimes
          .map(a => a[0] + a[1])
          .reduce((a, b) => a + b, 0)
      }))
        .sort(({ sumTime: a }, { sumTime: b }) => a - b)
        .map(e=>{
          let {sumTime} =e 
        const ms = sumTime % 1000;
        sumTime = Math.floor(sumTime / 1000)
        const s = sumTime % 60;
        sumTime = Math.floor(sumTime / 60)
        const m = sumTime % 60;
        sumTime = Math.floor(sumTime / 60)
        const h = sumTime % 24;
        sumTime = Math.floor(sumTime / 24)
        const d = sumTime;
        return{
          ...e,
          sumTimeString : ` ${d} days, ${h} hours, ${m} mins`,
            ms,
            s,
            m,
            h,d
          }
        })
    }
  } catch (err) {
    console.dir(err);
    return {
      ok: false,
      message: String(err),
      data:null
    };
  }
})