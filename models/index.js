const Comment = require("./Comment")
const Project = require("./Project")
const Status = require("./Status")
const User = require("./User")
const Subject = require("./Subject")
const Curriculum = require("./Curriculum")
const SubjectTag = require("./SubjectTag")
const CurriculumTag = require("./CurriculumTag")

User.hasMany(Project)
Project.belongsTo(User)

User.hasMany(Status)
Status.belongsTo(User)

Project.hasMany(Status)
Status.belongsTo(Project)

Project.hasMany(Comment)
Comment.belongsTo(Project)

User.hasMany(Comment)
Comment.belongsTo(User)

Curriculum.belongsToMany(Project, {
    through:"CurriculumTag"
})

Project.belongsToMany(Curriculum, {
    through:"CurriculumTag"
})

Subject.belongsToMany(Project, {
    through:"SubjectTag"
})

Project.belongsToMany(Subject, {
    through:"SubjectTag"
})

module.exports = {User, Project, Comment, Subject, Curriculum, Status, SubjectTag, CurriculumTag }