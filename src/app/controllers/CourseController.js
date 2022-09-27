const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose.js');

class CourseController {
    create(req, res, next) {
        res.render('courses/create');
    }

    //[post] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then((course) =>
                res.render('courses/show', {course: mongooseToObject(course)})
            )
            .catch(next);
    }

    //[put] /courses/:id
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {course: mongooseToObject(course)})
            )
            .catch(next);
    }

    //[put] /courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
}

module.exports = new CourseController();
