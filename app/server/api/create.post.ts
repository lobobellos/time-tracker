import users from '../dbModels/user'
interface IRequestBody {
  pin: number
  name: string
  title: string
}

export default defineEventHandler(async (event) => {
  const { pin, name, title } = await readBody<IRequestBody>(event)
  console.log("trying to create acct", pin, name, title)

  try {
    const userData = await users.findOne({
      pin: pin
    });
    console.log("users with same pin: ", userData)
    if (userData) {
      console.log(`User with pin ${pin} already exists`);
      return {
        ok: false,
        code: "USER_EXISTS",
        message: "User with given pin already exists.",
      };
    } else {
      console.log("Create user");
      const newUserData = await users.create({
        pin,
        name,
        title,
        bio: '',
        roomTimes: []
      });

      setCookie(event, "id", pin.toString())
      return {
        ok: true,
        message: "account created"
      }
    }
  } catch (err) {
    return {
      ok: false,
      message: String(err),
    };
  }
})



