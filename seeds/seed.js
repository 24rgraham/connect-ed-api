const sequelize = require("../config/connection");
const { User, Project, Status, Subject, Curriculum, CurriculumTag, SubjectTag } = require("../models");

const userData = [
  {
    
    email: "john@cusack.com",
    password: "Iamjohn",
    first_name: "Shelly",
    last_name: "Shell",
    school: "Roosevelt",
    city: "Bethleham",
    state: "PA",
    language: "English",
    profile_picture: null,
  },
  {
    email: "jack@sparrow.com",
    password: "Iamthecaptain",
    first_name: "Robyn",
    last_name: "Hood",
    school: "Ballard",
    city: "Seattle",
    state: "WA",
    language: "Pirate English",
    profile_picture: null,
  },
  {
    email: "dance@dance.dance",
    password: "dancingdeedee",
    first_name: "Dee Dee",
    last_name: "Dee",
    school: "Garfield",
    city: "Seattle",
    state: "WA",
    language: "British English",
    profile_picture: null,
  },
  {
    email: "hermione@harry.com",
    password: "voldemort",
    first_name: "",
    last_name: "Hermione",
    school: "Granger",
    city: "Seattle",
    state: "WA",
    language: "British English",
    profile_picture: null,
  },
  {
    email: "jump@jump.jump",
    password: "jwaltzingmatilda",
    first_name: "Matilda",
    last_name: "Dahl",
    school: "Garfield",
    city: "Seattle",
    state: "WA",
    language: "British English",
    profile_picture: null,
  },
];

const projectData = [
  {
    title: "Debris Hut Survival Shelter",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063338/IMG_3326_sujm2j.jpg",
    grade_lvl: "9",
    est_time: 4,
    overview_desc: "Learn about the physics of heat, and construction in this Social Emotional building, creative team challenge.",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each student/class, where to source them if unique, etc.",
    resources: "https://www.youtube.com/watch?v=tzUpH0Zft5c",
    UserId: 2,
  },
  {
    title: "Garlic Grow",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063336/garlic_nk8uup.jpg",
    grade_lvl: "8",
    est_time: 8,
    overview_desc: "Growing Garlic is the perfect school-year long exploration in the cycle of growing to eating food. Garlic is accessible, and easy to plant. A variety of containers will suit your needs if garden space is not available ",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each student/class, where to source them if unique, etc.",
    resources: "new;lkrnwe5 vlkewn;r nergre",
    UserId: 3,
  },
  {
    title: "Corn Husk Dolls",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063336/3e5W40R1SZOpgJky3uLo_urb11t.webp",
    grade_lvl: "K",
    est_time: 6,
    overview_desc: "This Project explores North American Indigenous culture in a hands on craft while creating lots of space for discussions around history",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each student/class, where to source them if unique, etc.",
    resources: "",
    UserId: 5,
  },
  {
    title: "Build a table",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063336/hydro_tnvere.jpg",
    grade_lvl: "11",
    est_time: 12,
    overview_desc: "Hydroponics is a great experiment in food, science, and hands on learning. A school year long (and beyond) interactive project that can be adapted for all ages.",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each student/class, where to source them if unique, etc.",
    UserId: 1,
  },
  {
    title: "Natural Dye",
    image: "FA2246QI9GWE69V",
    grade_lvl: "12",
    est_time: 5,
    overview_desc: "b  lahdg  ak;la   jnert",
    directions: "Step 1: say 1.. Step 2: say 2.. Step 3: say 3.. Step 4: say 4.. Step 5: say 5.. Step 6: Party",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each student/class, where to source them if unique, etc.",
    resources: "",
    UserId: 1,
  },
  {
    title: "Projected Nature Classroom Provocation",
    image: "image-asset",
    grade_lvl: "1",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 3,
  },
  {
    title: "Fire Building",
    image: "image-3631",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 5,
  },
  {
    title: "Lunar New Year Lantern",
    image: "image-3369",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 5,
  },
  {
    title: "Sugar Skull",
    image: "sugarSkull",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 5,
  },
  {
    title: "Dia De los Muertos Ofrenda",
    image: "ofrenda",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 5,
  },
  {
    title: "Civil Rights Protest",
    image: "img_3523",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 5,
  },
  {
    title: "Mushrooms",
    image: "mushrooms",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 5,
  },
  {
    title: "Vermicology Composting",
    image: "worms-1-5",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 5,
  },
  {
    title: "Beeswax Candles",
    image: "img_0911",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 5,
  },
]

const curriculumData = [
  {
    id: 1,
    name: "Montessori",
  },
  {

    id: 2,
    name: "Waldorf",
  },
  {
    id: 3,
    name: "Standard",
  },
  {
    id: 4,
    name: "PBL",
  },
  {
    id: 5,
    name: "Reggio Emilia",
  },
  {
    id: 6,
    name: "B.E.E.T.L.E.S (Outdoor Ed.)",
  },
]

const subjectData = [
  {
    id: 1,
    name: "Art",
  },
  {

    id: 2,
    name: "Maths",
  },
  {
    id: 3,
    name: "History",
  },
  {
    id: 4,
    name: "SEL",
  },
  {
    id: 5,
    name: "Woodworking",
  },
  {
    id: 6,
    name: "Anthropologie",
  },
  {
    id: 7,
    name: "Science",
  },
  {
    id: 8,
    name: "English",
  },
  {
    id: 9,
    name: "Writing",
  },
  {
    id: 10,
    name: "Spanish",
  },
  {
    id: 11,
    name: "French",
  },
  {
    id: 12,
    name: "Outdoor",
  },
  {
    id: 13,
    name: "Physical Education",
  },
  {
    id: 14,
    name: "Cultural Holidays",
  },
  {
    id: 15,
    name: "Culture",
  },
  {
    name: "Science",
  },
  
]

const curriculumTagData = [
  {
    CurriculumId: 3,
    ProjectId: 1,
  },
  {
    CurriculumId: 4,
    ProjectId: 2,
  },
  {
    CurriculumId: 3,
    ProjectId: 3,
  },
  {
    CurriculumId: 1,
    ProjectId: 4,
  },
]

const subjectTagData = [
  {
    SubjectId: 13,
    ProjectId: 1,
  },
  {
    SubjectId: 12,
    ProjectId: 1,
  },
  {
    SubjectId: 2,
    ProjectId: 1,
  },
  {
    SubjectId: 3,
    ProjectId: 2,
  },
  {
    SubjectId: 10,
    ProjectId: 3,
  },
  {
    SubjectId: 7,
    ProjectId: 4,
  },
  {
    SubjectId: 2,
    ProjectId: 3,
  },
]

const statusData = [
  {
    in_progress: true,
    UserId: 1,
    ProjectId: 1,
  },
  {
    saved_for_later: true,
    UserId: 2,
    ProjectId: 2,
  },
  {
    starred: true,
    UserId: 3,
    ProjectId: 1,
  },
  {
    starred: true,
    UserId: 3,
    ProjectId: 2,
  },
  {
    completed: true,
    UserId: 2,
    ProjectId: 5,
  },
  {
    in_progress: true,
    UserId: 1,
    ProjectId: 1,
  },
  {
    saved_for_later: true,
    UserId: 2,
    ProjectId: 6,
  },
  {
    starred: true,
    UserId: 3,
    ProjectId: 1,
  },
  {
    starred: true,
    UserId: 3,
    ProjectId: 2,
  },
  {
    completed: true,
    UserId: 2,
    ProjectId: 1,
  },
]


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const project = await Project.bulkCreate(projectData);
  const subject = await Subject.bulkCreate(subjectData);
  const curriculum = await Curriculum.bulkCreate(curriculumData);
  const status = await Status.bulkCreate(statusData);

  const curriculumTag = await CurriculumTag.bulkCreate(curriculumTagData);
  const subjectTag = await SubjectTag.bulkCreate(subjectTagData);
};

seedDatabase();