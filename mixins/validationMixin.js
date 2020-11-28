/* eslint-disable no-useless-escape */
/* eslint-disable no-mixed-operators */
export default {
  data () {
    return {
      validationRules: {
        name: [
          v => !!v || 'Name is required',
          v => v && v.length <= 30 || 'Name must be less than 30 characters'
        ],

        firstName: [
          v => !!v || 'First Name is required',
          v => v && v.length >= 3 || 'First Name must be greater than 3 characters',
          v => v && v.length <= 30 || 'First Name must be less than 30 characters'
        ],

        lastName: [
          v => !!v || 'Last Name is required',
          v => v && v.length >= 3 || 'Last Name must be greater than 3 characters',
          v => v && v.length <= 30 || 'Last Name must be less than 30 characters'
        ],

        description: [
          v => !!v || 'Description is required'
        ],

        email: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid'
        ],
        password: [
          v => !!v || 'Password is required',
          // eslint-disable-next-line no-mixed-operators
          v => v && v.length >= 6 || 'Password length must be greater than 5 letters'
        ],
        confirmPassword: [
          v => (this.password === v) || 'Password doesn`t match',
          v => !!v || 'Confirmation Password is required'
        ],
        phone: [
          v => !!v || 'Phone is Required',
          v => /\+?(88)?0?1[3456789][0-9]{8}\b/.test(v) || 'Number must be valid'
        ],

        time: [v => !!v || 'Time is required'],

        agreement: [v => !!v || 'Please accept terms & conditions to proceed'],

        address: [v => !!v || 'Address is Required'],

        select: [v => !!v || 'This field is required'],

        date: [v => !!v || 'Date is required'],

        pin: [v => !!v || 'PIN is required'],

        message: [v => !!v || 'Message is required'],

        age: [
          v => !!v || 'Age is required',
          v => /^[1-9]?[0-9]{1}$|^100$/.test(v) || 'Age must be between 1 to 100'
        ],

        gender: [v => !!v || 'Gender is required'],

        title: [v => !!v || 'Title is required'],

        tag: [v => !!v || 'Tag is required'],

        linktype: [v => !!v || ' This field must be required'],

        comments: [v => !!v || ' Comments is required'],

        number: [v => !!v || ' Number is required'],

        url: [
          v => !!v || 'Url is required',
          v => /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(v) || 'Must be a Valid Url'
        ],

        link: [
          v => !!v || 'Link is required',
          v => /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(v) || 'Must be a Valid Link'
        ],

        userName: [v => !!v || 'User Name is required'],

        required: [v => !!v || 'This field is Required'],

        mustImput: [v => !!v || 'This field is required']
      }
    }
  }
}
