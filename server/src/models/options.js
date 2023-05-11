const modelOptions = {
  versionKey: false, // remove key __v: ...
  timestamps: true,
  // convert document to json (eg: response return to client, ...)
  toJSON: {
    virtuals: true, // virtual properties -> const personSchema = new mongoose.Schema({ firstName: String, lastName: String, }); personSchema.virtual('fullName').get(function() { return `${this.firstName} ${this.lastName}`; });
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  // convert document to plain JS object (eg: clg, ...)
  toObject: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
};

export default modelOptions;
