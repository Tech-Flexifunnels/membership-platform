import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useProgress } from '../hooks/useProgress';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/course/ProgressBar';
import { BookOpen, Clock, CheckCircle, PlayCircle } from 'lucide-react';

const MyLearning = () => {
  const { data: courses, isLoading } = useCourses();
  const { getProgress } = useProgress();
  const [filter, setFilter] = useState('all'); // all, in-progress, completed

  const getFilteredCourses = () => {
    if (!courses) return [];

    return courses.filter(course => {
      const progress = getProgress(course.id);
      const completionRate = progress.completedCount / course.lessons.length;

      if (filter === 'in-progress') {
        return completionRate > 0 && completionRate < 1;
      }
      if (filter === 'completed') {
        return completionRate === 1;
      }
      return true; // all
    });
  };

  const filteredCourses = getFilteredCourses();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning</h1>
          <p className="text-gray-600">Track your progress and continue learning</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setFilter('all')}
              className={`pb-4 px-2 font-medium transition-colors ${
                filter === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`pb-4 px-2 font-medium transition-colors ${
                filter === 'in-progress'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`pb-4 px-2 font-medium transition-colors ${
                filter === 'completed'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              {filter === 'completed'
                ? "You haven't completed any courses yet"
                : filter === 'in-progress'
                ? "You haven't started any courses yet"
                : 'No courses available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const progress = getProgress(course.id);
              const completionRate = (progress.completedCount / course.lessons.length) * 100;
              const isCompleted = completionRate === 100;

              return (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <Link to={`/course/${course.id}`}>
                    {/* Course Image */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-500 rounded-t-lg overflow-hidden">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <BookOpen className="w-16 h-16 text-white opacity-50" />
                        </div>
                      )}
                      {isCompleted && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                        {course.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium text-blue-600">
                            {Math.round(completionRate)}%
                          </span>
                        </div>
                        <ProgressBar progress={completionRate} />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <PlayCircle className="w-4 h-4" />
                          <span>{progress.completedCount} / {course.lessons.length} lessons</span>
                        </div>
                      </div>

                      {/* Continue Button */}
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        {isCompleted ? 'Review Course' : 'Continue Learning'}
                      </button>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyLearning;
