import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Project'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  defaultPageId: {
    type: String,
    default: 'home'
  },
  pages: {
    type: Array,
    default: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        tree: {
          id: 'root',
          type: 'Page',
          name: 'Page',
          props: {
            style: {
              minHeight: '100vh',
              backgroundColor: '#ffffff'
            }
          },
          children: []
        }
      }
    ]
  },
  thumbnail: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
