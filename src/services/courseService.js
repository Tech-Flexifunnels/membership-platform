import apiClient from './apiClient';
import { API_CONFIG, encodeCourseId, buildURL } from './api.config';

class CourseService {
  // Get all courses
  async getCourses() {
    try {
      // Try API endpoint first
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.API_COURSES);
      
      if (response.success && response.data) {
        return {
          success: true,
          courses: this.normalizeCourses(response.data),
        };
      }

      // Fallback to mock data if API fails
      return this.getMockCourses();
    } catch (error) {
      console.error('Error fetching courses:', error);
      return this.getMockCourses();
    }
  }

  // Get course details
  async getCourseDetails(courseId) {
    try {
      const encodedId = encodeCourseId(courseId);
      const url = `${API_CONFIG.ENDPOINTS.MY_LEARNING}?course=${encodedId}`;
      
      const response = await apiClient.get(url);
      
      if (response.success) {
        return {
          success: true,
          course: this.normalizeCourseDetails(response.data, courseId),
        };
      }

      // Fallback to mock data
      return this.getMockCourseDetails(courseId);
    } catch (error) {
      console.error('Error fetching course details:', error);
      return this.getMockCourseDetails(courseId);
    }
  }

  // Get lessons for a course
  async getLessons(courseId) {
    try {
      const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.API_LESSONS}/${courseId}`);
      
      if (response.success) {
        return {
          success: true,
          lessons: response.data,
        };
      }

      return this.getMockLessons(courseId);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      return this.getMockLessons(courseId);
    }
  }

  // Mark lesson as complete
  async markLessonComplete(courseId, lessonId) {
    try {
      const response = await apiClient.post(`/api/lessons/${lessonId}/complete`, {
        course_id: courseId,
      });
      
      return response;
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Normalize courses data
  normalizeCourses(data) {
    if (Array.isArray(data)) {
      return data;
    }
    // Handle different response formats
    return data.courses || data.data || [];
  }

  // Normalize course details
  normalizeCourseDetails(data, courseId) {
    // If data is HTML, we'll use mock data
    if (typeof data === 'string') {
      return this.getMockCourseDetails(courseId).course;
    }
    return data;
  }

  // Mock courses data (fallback)
  getMockCourses() {
    return {
      success: true,
      courses: [
        {
          id: '842654',
          title: 'Yoga & Meditation',
          description: 'Learn yoga and meditation techniques for hair health',
          thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
          lessons: 29,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 35,
          completed: 10,
          status: 'in_progress',
        },
        {
          id: '842655',
          title: 'Common Myths & Mistakes',
          description: 'Debunking common hair care myths',
          thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
          lessons: 2,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 100,
          completed: 2,
          status: 'completed',
        },
        {
          id: '842656',
          title: 'Know Your Hair',
          description: 'Understanding your hair type and needs',
          thumbnail: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400',
          lessons: 23,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842657',
          title: 'Hair Regrowth Drinks',
          description: 'Nutritional drinks for hair regrowth',
          thumbnail: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
          lessons: 15,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 20,
          completed: 3,
          status: 'in_progress',
        },
        {
          id: '842658',
          title: 'Know Your Scalp',
          description: 'Understanding scalp health and care',
          thumbnail: 'https://images.unsplash.com/photo-1560869713-bf165a0ff7a3?w=400',
          lessons: 18,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842659',
          title: 'Homemade Magical Recipes',
          description: 'DIY hair care recipes',
          thumbnail: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
          lessons: 25,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842660',
          title: 'Hair Oiling Techniques',
          description: 'Proper hair oiling methods',
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          lessons: 12,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842661',
          title: 'Hair Washing Routine',
          description: 'Best practices for washing hair',
          thumbnail: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400',
          lessons: 10,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842662',
          title: 'Hair Drying Methods',
          description: 'Safe hair drying techniques',
          thumbnail: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
          lessons: 8,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842663',
          title: 'Hair Styling Tips',
          description: 'Healthy hair styling techniques',
          thumbnail: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400',
          lessons: 14,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842664',
          title: 'Diet for Hair Health',
          description: 'Nutrition for healthy hair',
          thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
          lessons: 16,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842665',
          title: 'Stress Management',
          description: 'Managing stress for hair health',
          thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
          lessons: 11,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842666',
          title: 'Sleep and Hair Health',
          description: 'Importance of sleep for hair',
          thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
          lessons: 9,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
        {
          id: '842667',
          title: 'Exercise for Hair Growth',
          description: 'Physical activity and hair health',
          thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
          lessons: 13,
          enrollmentDate: '2, Nov 2025, 04:50 PM',
          progress: 0,
          completed: 0,
          status: 'not_started',
        },
      ],
    };
  }

  // Mock course details (fallback)
  getMockCourseDetails(courseId) {
    const courses = this.getMockCourses().courses;
    const course = courses.find(c => c.id === courseId) || courses[0];
    
    return {
      success: true,
      course: {
        ...course,
        modules: [
          {
            id: '1',
            title: course.title,
            lessons: this.generateMockLessons(course.lessons, course.title),
          },
        ],
      },
    };
  }

  // Generate mock lessons
  generateMockLessons(count, courseTitle) {
    const lessons = [];
    for (let i = 1; i <= count; i++) {
      lessons.push({
        id: `lesson-${i}`,
        title: `Day ${i} - ${courseTitle}`,
        duration: '15:30',
        completed: i <= 10, // First 10 lessons completed
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      });
    }
    return lessons;
  }

  // Mock lessons (fallback)
  getMockLessons(courseId) {
    const courseDetails = this.getMockCourseDetails(courseId);
    return {
      success: true,
      lessons: courseDetails.course.modules[0].lessons,
    };
  }
}

const courseService = new CourseService();

export default courseService;
