userSchema.pre("save", { validate: true }, function(next) {
    validatePassword(this.password);
    next();
  });

  module.exports = User;