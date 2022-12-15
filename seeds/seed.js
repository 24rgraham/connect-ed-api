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
    id: 1, 
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
    id: 2, 
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
    id:3,
    title: "Corn Husk Dolls",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063336/3e5W40R1SZOpgJky3uLo_urb11t.webp",
    grade_lvl: "K",
    est_time: 6,
    overview_desc: "This Project explores North American Indigenous culture in a hands on craft while creating lots of space for discussions around history",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each student/class, where to source them if unique, etc.",
    resources: "fhdsfdsk",
    UserId: 5,
  },
  {
    id:4, 
    title: "Hydroponics Indoor Garden Table",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063336/hydro_tnvere.jpg",
    grade_lvl: "11",
    est_time: 12,
    overview_desc: "Hydroponics is a great experiment in food, science, and hands on learning. A school year long (and beyond) interactive project that can be adapted for all ages.",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each student/class, where to source them if unique, etc.",
    UserId: 1,
  },
  {
    id:5, 
    title: "Natural Dye",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063336/FA2246QI9GWE69V_ke7kxd.webp",
    grade_lvl: "12",
    est_time: 5,
    overview_desc: "An exploration in nature, science and art. This is a great opportunity for students to bring in food scraps to be reused as natural day, or you can forage from nature ",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each student/class, where to source them if unique, etc.",
    resources: "https://www.architecturaldigest.com/story/how-to-naturally-dye-using-foods , https://www.youtube.com/watch?v=78gt6y9Lrf4",
    UserId: 4,
  },
  {
    id:6, 
    title: "Projected Nature Classroom Provocation",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063337/image-asset_e5llpw.jpg",
    grade_lvl: "1",
    est_time: 1,
    overview_desc: "Experience the natural world from within your classroom",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://www.youtube.com/watch?v=ZXYW2LGrYYA",
    UserId: 3,
  },
  {
    id:7, 
    title: "Fire Building",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063341/IMG_3631_keldy8.jpg",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "Building confidence and skills with this activity. Perfect for a field trip, and team building.",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://blog.ucogear.com/fire-starting-101-the-basics-of-starting-a-fire/e",
    UserId: 5,
  },
  {
    id:8,
    title: "Lunar New Year Lantern",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063338/IMG_3369_ihuonm.jpg",
    grade_lvl: "5",
    est_time: 1,
    overview_desc: "An opportunity for students to learn about the culture of Lunar New Year with a craft",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://www.youtube.com/watch?v=XfoOGzSciL8 , https://www.youtube.com/watch?v=Mm9LJC_5g2o",
    UserId: 5,
  },
  {
    id:9,
    title: "Sugar Skull",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063339/sugarSkull_o3gcp8.jpg",
    grade_lvl: "2",
    est_time: 1,
    overview_desc: "Dia de los Muertos",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://www.youtube.com/watch?v=GAalJIKnw44 , https://www.youtube.com/watch?v=_sSawpU81cI",
    UserId: 5,
  },
  {
    id:10,
    title: "Dia De los Muertos Ofrenda",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063342/ofrenda_crgjqc.jpg",
    grade_lvl: "6",
    est_time: 1,
    overview_desc: "A hands on learning experience to explore the Mexican holiday of Dia De los Muertos. Students can help, stage, and create  the ofrenda components, and offerings. Top the day off with some tamale making and eating. Enjoy!",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://www.youtube.com/watch?v=_sSawpU81cI , https://www.youtube.com/watch?v=09YjMTLp6ko",
    UserId: 5,
  },
  {
    id:11,
    title: "Civil Rights Protest",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063338/IMG_3523_uqiwrc.jpg",
    grade_lvl: "4",
    est_time: 3,
    overview_desc: "A combined reading and art project to explore the civil rights movement, and finding your voice and inner power to stand up for what personally matters",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://www.youtube.com/watch?v=AebGhEvpZDI",
    UserId: 5,
  },
  {
    id:12, 
    title: "Mushrooms",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063338/mushrooms_tihso7.jpg",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "Science and art combined in to a fun project to explore the world of mycology and the ways mushrooms release spores.",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://namyco.org/how_to_spore_prints.php",
    UserId: 5,
  },
  {
    id:13,
    title: "Vermicology Composting",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063341/worms-1-5_ht5enl.jpg",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "Class pet? Why not a worm bin to explore science, and nature, and the power of our wriggly friends who live below the surface.",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://kids.nationalgeographic.com/animals/invertebrates/facts/earthworm , https://urbanwormcompany.com/how-to-start-worm-bin/",
    UserId: 5,
  },
  {
    id:14,
    title: "Beeswax Candles",
    image: "https://res.cloudinary.com/dqv6cj4bc/image/upload/v1671063338/IMG_0911_znpafu.jpg",
    grade_lvl: "4",
    est_time: 1,
    overview_desc: "Bees are an important part of our ecosystem. Entrance students with their magic, and top of your learning with the calming magic of a beeswax craft",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://www.natgeokids.com/au/discover/animals/insects/honey-bees/ , https://www.chatfieldcourt.com/how-to-make-beeswax-candles-with-raw-beeswax/",
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
    id: 16,
    name: "Science",
  },
  
]

const curriculumTagData = [
  {
    CurriculumId: 4,
    ProjectId: 1,
  },
  {
    CurriculumId: 6,
    ProjectId: 1,
  },
  {
    CurriculumId: 6,
    ProjectId: 2,
  },
  {
    CurriculumId: 4,
    ProjectId: 2,
  },
  {
    CurriculumId: 2,
    ProjectId: 3,
  },
  {
    CurriculumId: 5,
    ProjectId: 4,
  },
  {
    CurriculumId: 6,
    ProjectId: 4,
  },
  {
    CurriculumId: 4,
    ProjectId: 4,
  },
  {
    CurriculumId: 2,
    ProjectId: 5,
  },
  {
    CurriculumId: 1,
    ProjectId: 4,
  },
  {
    CurriculumId: 6,
    ProjectId: 6,
  },
  {
    CurriculumId: 6,
    ProjectId: 7,
  },
  {
    CurriculumId: 3,
    ProjectId: 8,
  },
  {
    CurriculumId: 1,
    ProjectId: 9,
  },
  {
    CurriculumId: 1,
    ProjectId: 10,
  },
  {
    CurriculumId: 4,
    ProjectId: 11,
  },
  {
    CurriculumId: 5,
    ProjectId: 12,
  },
  {
    CurriculumId: 1,
    ProjectId: 12,
  },
  {
    CurriculumId: 4,
    ProjectId: 13,
  },
  {
    CurriculumId: 2,
    ProjectId: 14,
  },
  {
    CurriculumId: 4,
    ProjectId: 14,
  },
]

const subjectTagData = [
  {
    SubjectId: 7,
    ProjectId: 1,
  },
  {
    SubjectId: 4,
    ProjectId: 1,
  },
  {
    SubjectId: 2,
    ProjectId: 1,
  },
  {
    SubjectId: 7,
    ProjectId: 2,
  },
  {
    SubjectId: 12,
    ProjectId: 2,
  },
  {
    SubjectId: 4,
    ProjectId: 2,
  },
  {
    SubjectId: 3,
    ProjectId: 3,
  },
  {
    SubjectId: 14,
    ProjectId: 3,
  },
  {
    SubjectId: 16,
    ProjectId: 4,
  },
  {
    SubjectId: 12,
    ProjectId: 4,
  },
  {
    SubjectId: 12,
    ProjectId: 5,
  },
  {
    SubjectId: 16,
    ProjectId: 5,
  },
  {
    SubjectId: 1,
    ProjectId: 5,
  },
  {
    SubjectId: 1,
    ProjectId: 6,
  },
  {
    SubjectId: 16,
    ProjectId: 6,
  },
  {
    SubjectId: 12,
    ProjectId: 6,
  },
  {
    SubjectId: 4,
    ProjectId: 7,
  },
  {
    SubjectId: 16,
    ProjectId: 7,
  },
  {
    SubjectId: 12,
    ProjectId: 7,
  },
  {
    SubjectId: 1,
    ProjectId: 8,
  },
  {
    SubjectId: 3,
    ProjectId: 8,
  },
  {
    SubjectId: 14,
    ProjectId: 8,
  },
  {
    SubjectId: 2,
    ProjectId: 9,
  },
  {
    SubjectId: 1,
    ProjectId: 9,
  },
  {
    SubjectId: 14,
    ProjectId: 9,
  },
  {
    SubjectId: 3,
    ProjectId: 9,
  },
  {
    SubjectId: 1,
    ProjectId: 11,
  },
  {
    SubjectId: 3,
    ProjectId: 11,
  },
  {
    SubjectId: 6,
    ProjectId: 11,
  },
  {
    SubjectId: 15,
    ProjectId: 11,
  },
  {
    SubjectId: 1,
    ProjectId: 12,
  },
  {
    SubjectId: 16,
    ProjectId: 12,
  },
  {
    SubjectId: 12,
    ProjectId: 12,
  },
  {
    SubjectId: 16,
    ProjectId: 13,
  },
  {
    SubjectId: 1,
    ProjectId: 14,
  },
  {
    SubjectId: 16,
    ProjectId: 14,
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
    UserId: 1,
    ProjectId: 2,
  },
  {
    starred: true,
    UserId: 1,
    ProjectId: 9,
  },
  {
    starred: true,
    UserId: 1,
    ProjectId: 11,
  },
  {
    completed: true,
    UserId: 1,
    ProjectId: 5,
  },
  {
    in_progress: true,
    UserId: 1,
    ProjectId: 3,
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