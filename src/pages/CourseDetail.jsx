import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { useCourse } from '../hooks/useCourses';
import { useProgress } from '../hooks/useProgress';
import VideoPlayer from '../components/course/VideoPlayer';
import LessonList from '../components/course/LessonList';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useCourse(courseId);
  const { markLessonComplete, isLessonComplete, getCompletedCount } = useProgress();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    if (course && course.lessons.length > 0 && !currentLesson) {
      setCurrentLesson(course.lessons[0]);
    }
  }, [course, currentLesson]);

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleMarkComplete = () => {
    if (currentLesson && courseId) {
      markLessonComplete(courseId, currentLesson.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading course..." />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Course not found</p>
          <Link to="/dashboard" className="text-primary-500 hover:underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Update course lessons with completion status
  const updatedCourse = {
    ...course,
    lessons: course.lessons.map(lesson => ({
      ...lesson,
      completed: isLessonComplete(courseId, lesson.id)
    }))
  };

  const completedCount = getCompletedCount(courseId);

  const tabs = [
    { id: 'about', label: 'About Lesson' },
    { id: 'discussions', label: 'Discussions', badge: '0' },
    { id: 'notes', label: 'Notes', badge: '12' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Badge variant="pink" className="px-3 py-1">
              <Link to="/dashboard" className="flex items-center space-x-1">
                <Home className="w-3 h-3" />
                <span>Home</span>
              </Link>
            </Badge>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 font-medium">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video */}
            <VideoPlayer
              videoUrl={currentLesson?.videoUrl}
              poster={course.thumbnail}
              className="aspect-video"
            />

            {/* Course Info */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <Button
                  onClick={handleMarkComplete}
                  variant="primary"
                  size="md"
                  disabled={isLessonComplete(courseId, currentLesson?.id)}
                >
                  {isLessonComplete(courseId, currentLesson?.id) ? 'Completed' : 'Mark as Complete'}
                </Button>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Module:</span> {course.title}
                </p>
                <p>
                  <span className="font-medium">Lesson:</span> {currentLesson?.title}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        py-4 border-b-2 font-medium text-sm transition-colors relative
                        ${activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                        }
                      `}
                    >
                      {tab.label}
                      {tab.badge && (
                        <Badge variant="danger" className="ml-2 text-xs">
                          {tab.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'about' && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About this lesson</h3>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                )}
                {activeTab === 'discussions' && (
                  <div className="text-center py-8 text-gray-500">
                    No discussions yet
                  </div>
                )}
                {activeTab === 'notes' && (
                  <div className="text-center py-8 text-gray-500">
                    Your notes will appear here
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Lesson List */}
          <div className="lg:col-span-1">
            <LessonList
              course={updatedCourse}
              currentLessonId={currentLesson?.id}
              onLessonSelect={handleLessonSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
